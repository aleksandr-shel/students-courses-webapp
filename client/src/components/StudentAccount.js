import React from "react";
import axios from "axios";
import {ListGroup, Breadcrumb, Button} from 'react-bootstrap';
import { useUser } from './../auth/useUser';
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


export default function StudentAccount(){

    const student = useUser();
    const [studentCourses, setStudentCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(async()=>{
        await loadCourses();
    },[])

    async function loadCourses(){
        const result = await axios.get(`/api/users/courses/${student.id}`)
        setStudentCourses(result.data);
    }


    return (
        <>
            <Breadcrumb style={{background:"none",color: 'black'}}>
                <Breadcrumb.Item style={{color: 'blue'}} href="/">Courses list</Breadcrumb.Item>
                <Breadcrumb.Item active>Student Account</Breadcrumb.Item>
            </Breadcrumb>
            <Button onClick={()=> navigate('/student-update-account')}>
                Update Student Info
            </Button>
            {student!= null &&
            <StudentInfoDiv>
                <h1>Student Account</h1>
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