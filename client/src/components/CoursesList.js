import React from "react";
import { useLoggedInContext } from "../Context/LoggedInContext";
import axios from 'axios';
import {useState, useEffect} from 'react';
import {ListGroup, Spinner, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../auth/useUser";
import { useToken } from './../auth/useToken';

export default function CourseList(){

    const loggedInContext = useLoggedInContext()
    const user = useUser();
    const [token, setToken] = useToken();
    const [showLoading, setShowLoading] = useState(false);
    const [courseList, setCourseList] = useState([]);
    const [userCourses, setUserCourses] = useState([]);

    const navigate = useNavigate();
    useEffect(async ()=>{
        await loadCourseList();
        await loadUserCourses();
    },[])

    async function loadCourseList(){
        setShowLoading(true);
        const result = await axios.get('/api/courses');
        setCourseList(result.data);
        setShowLoading(false);
    }

    async function loadUserCourses(){
        const result = await axios.get(`/api/users/courses/${user.id}`);
        setUserCourses(result.data);
    }

    function addCourse(){
        navigate('/add-course-form')
    }

    function takeCourse(courseId){
        axios.post(`/api/courses/take/${courseId}`,
        {},
        {
            headers:{Authorization:`Bearer ${token}`}
        }).then(result =>{
            if (result.data.success){
                setUserCourses(userCourses => {
                    return [...userCourses, result.data.course]
                })
            }
            console.log(result);
        }).catch(err=>{
            console.log(err);
        })
    }

    function dropCourse(courseId){
        axios.post(`/api/courses/drop/${courseId}`,
        {},
        {
            headers:{Authorization:`Bearer ${token}`}
        }).then(result =>{
            if (result.data.success){
                setUserCourses(userCourses => {
                    return userCourses.filter(item => item._id !== result.data.course._id)
                })
            }
        })
    }

    function courseDetails(courseId){
        navigate(`/courses/${courseId}`)
    }

    function deleteCourse(courseId){
        axios.delete(`/api/courses/delete/${courseId}`,{
            headers:{Authorization: `Bearer ${token}`}
        }).then(result=>{
            if (result.data.success){
                setCourseList(courses => courses.filter(item => item._id !== courseId))
            }
        })
    }

    function updateCourse(courseId){
        navigate(`/update-course-form/${courseId}`)
    }

    return(
        <>
            {loggedInContext.loggedIn &&
            <Button style={{margin:'10px 10px'}} onClick={addCourse}>
                Add Course
            </Button>}
            {showLoading && 
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>}
            {courseList.length !== 0 
                ? 
                <div>
                    <Table responsive style={{margin:'20px auto'}}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Section</th>
                                <th>Semester</th>
                                <th></th>
                                {
                                    loggedInContext.loggedIn && 
                                    <React.Fragment>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </React.Fragment>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {courseList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.courseCode}</td>
                                    <td>{item.courseName}</td>
                                    <td>{item.section}</td>
                                    <td>{item.semester}</td>
                                    <td>
                                        <Button className="btn-primary" onClick={()=>courseDetails(item._id)}>Details</Button>
                                    </td>
                                    {
                                    loggedInContext.loggedIn && 
                                    <React.Fragment>
                                        {userCourses.some(course => course._id == item._id) ? 
                                            <td>
                                                <Button className="btn-warning" onClick={()=>dropCourse(item._id)}>Drop</Button>
                                            </td>
                                            :
                                            <td>
                                                <Button className="btn-success" onClick={()=>takeCourse(item._id)}>Take</Button>
                                            </td>
                                        }
                                        <td>
                                            <Button className="btn-secondary" onClick={()=>updateCourse(item._id)}>Update</Button>
                                        </td>
                                        <td>
                                            <Button className="btn-danger" onClick={()=>deleteCourse(item._id)}>Delete</Button>
                                        </td>
                                    </React.Fragment>
                                }
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            : 
                <div>
                    No courses
                </div>
            }
        </>
    )
}