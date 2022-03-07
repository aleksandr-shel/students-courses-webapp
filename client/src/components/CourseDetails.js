import React from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, Table } from "react-bootstrap";
import styled from "styled-components";
import axios from 'axios';
import { useState, useEffect } from "react";

export default function CourseDetails(){
    const {courseId} = useParams()
    const [course, setCourse] = useState();
    const [studentList, setStudentList] = useState([]);

    useEffect(()=>{
        loadCourse();
        loadCourseStudents();
    }, [])

    function loadCourse(){
        axios.get(`/api/courses/${courseId}`).then(result=>{
            setCourse(result.data);
        }).catch(err=>{
            console.log(err);
        })
    }

    function loadCourseStudents(){
        axios.get(`/api/courses/students/${courseId}`).then(result=>{
            setStudentList(result.data);
        }).catch(err=>{
            console.log(err);
        })
    }

    return(
        <>
            <Breadcrumb style={{background:"none",color: 'black'}}>
                <Breadcrumb.Item style={{color: 'blue'}} href="/">Courses List</Breadcrumb.Item>
                <Breadcrumb.Item active>Course Details Page</Breadcrumb.Item>
            </Breadcrumb>
            {
                course != null &&
                <>
                    <CourseDiv>
                        <div>
                            <b>Course Code:</b>
                            <span> </span>
                            {course.courseCode}
                        </div>
                        <div>
                            <b>Course Name:</b>
                            <span> </span>
                            {course.courseName}
                        </div>
                        <div>
                            <b>Section: </b>
                            <span> </span>
                            {course.section}
                        </div>
                        <div>
                            <b>Semester: </b>
                            <span> </span>
                            {course.semester}
                        </div>
                    </CourseDiv>
                    {
                        studentList.length !== 0 ?
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>Phone number</th>
                                    <th>Program</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentList.map((item,index)=>(
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>{item.city}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.program}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        :
                        <div>
                            no students
                        </div>
                    }
                </>
            }
        </>
    )
}


const CourseDiv = styled.div`
    display:flex;
    justify-content:center;
    align-items: start;
    flex-direction: column;
`