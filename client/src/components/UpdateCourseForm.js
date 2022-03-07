import React from "react";
import { Breadcrumb, Form, Button} from "react-bootstrap";
import { useParams, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useToken } from "../auth/useToken";

export default function UpdateCourseForm(){
    const navigate = useNavigate();
    const {courseId} = useParams();
    const [token,]=useToken();
    const [course, setCourse] = useState({});

    useEffect(()=>{
        loadCourse();
    },[])

    function UpdateCourseProcess(e){
        e.preventDefault();
        axios.put(`/api/courses/update/${courseId}`,
            course,
            {
            headers: {Authorization: `Bearer ${token}`}
        }).then(result=>{
            navigate('/')
        }).catch(err=>{
            console.log(err);
        })

    }

    function handleUpdateInputs(e){
        const name = e.target.name;
        const value = e.target.value;
        setCourse(course => ({...course, [name]: value }))
    }

    function loadCourse(){
        axios.get(`/api/courses/${courseId}`).then(result=>{
            setCourse(result.data);
        }).catch(err=>{
            console.log(err);
        })
    }

    return(
        <>
            <Breadcrumb style={{background:"none",color: 'black'}}>
                <Breadcrumb.Item style={{color: 'blue'}} href="/">Courses List</Breadcrumb.Item>
                <Breadcrumb.Item active>Update Course Page</Breadcrumb.Item>
            </Breadcrumb>
            <UpdateCourseDiv>
            <Form onSubmit={UpdateCourseProcess}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Course Code</Form.Label>
                        <Form.Control value={course.courseCode || ''} name="courseCode" onChange={handleUpdateInputs} autoComplete="off" type="text" placeholder="Course code" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control value={course.courseName || ''} name="courseName" onChange={handleUpdateInputs} autoComplete="off" type="text" placeholder="Course name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Section</Form.Label>
                        <Form.Control value={course.section || ''} name="section" onChange={handleUpdateInputs} autoComplete="off" type="text" placeholder="Section" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label>Semester </Form.Label>
                        <Form.Control value={course.semester || ''} name="semester" onChange={handleUpdateInputs} autoComplete="off" type="text" placeholder="Semester" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update Course
                    </Button>
                </Form>
            </UpdateCourseDiv>
        </>
    )
}



const UpdateCourseDiv = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top: 5%;
`