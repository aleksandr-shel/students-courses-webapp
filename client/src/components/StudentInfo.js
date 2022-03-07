import React from "react";
import { Breadcrumb, ListGroup } from "react-bootstrap";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";


export default function StudentInfo(){
    const [student, setStudent] = useState()
    const [studentCourses, setStudentCourses] = useState([]);

    const {userId} = useParams();

    useEffect(
        async ()=>{
            await loadStudentInfo();
            
        },
        []
    )

    async function loadStudentInfo(){
        const resultStudent = await axios.get(`/api/users/${userId}`)
        const resultCoursesStudent = await axios.get(`/api/users/courses/${userId}`)
        setStudent(resultStudent.data);
        setStudentCourses(resultCoursesStudent.data);
    }
    
    async function updateStudentInfo(){
        
    }

    return(
        <>
            <Breadcrumb style={{background:"none",color: 'black'}}>
                <Breadcrumb.Item style={{color: 'blue'}} href="/list-students">Students List</Breadcrumb.Item>
                <Breadcrumb.Item active>Student Info</Breadcrumb.Item>
            </Breadcrumb>
            {student!= null &&
            <StudentInfoDiv>
                <h3>{student.firstName} {student.lastName}</h3>
                <div>
                    <b>Email: </b>
                    <span> </span>
                    {student.email}
                </div>
                <div>
                    <b>Phone number:</b>
                    <span> </span>
                    {student.phoneNumber}
                </div>
                <div>
                    <b>Address: </b>
                    <span> </span>
                    {student.address}
                </div>
                <div>
                    <b>City: </b>
                    <span> </span>
                    {student.city}
                </div>
                <div>
                    <b>Program: </b>
                    <span> </span>
                    {student.program}
                </div>
            </StudentInfoDiv>
            }
            {studentCourses.length !==0 ?
            <ListGroup>
                Student's Courses: 
                {studentCourses.map((item,index)=>(
                    <ListGroup.Item key={index}>
                        {index + 1})
                        <span> </span>
                        {item.courseCode}
                        <span> </span>
                        {item.courseName}
                        <span> Section: </span>
                        {item.section}
                        <span> Semester: </span>
                        {item.semester}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            :
            <div>
                No courses
            </div>
            }
            
        </>
    )
}

const StudentInfoDiv = styled.div`
    display:flex;
    justify-content:center;
    align-items: start;
    flex-direction: column;
`

