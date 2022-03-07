import React from "react";
import axios from 'axios';
import { Form, Breadcrumb, Button } from "react-bootstrap";
import styled from 'styled-components';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from './../auth/useToken';

export default function AddCourseForm(){

    const [token,]=useToken();
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [section, setSection] = useState('');
    const [semester, setSemester] = useState('');

    const navigate = useNavigate();

    async function addCourseProcess(e){
        e.preventDefault();
        const result = await axios.post('api/courses/add',{
            courseCode,
            courseName,
            section,
            semester
        },{
            headers: {Authorization: `Bearer ${token}`}
        })

        console.log(result.data);

        navigate('/')
    }

    return(
        <>
            <Breadcrumb style={{background:"none",color: 'black'}}>
                <Breadcrumb.Item style={{color: 'blue'}} href="/">Courses List</Breadcrumb.Item>
                <Breadcrumb.Item active>Add Course Page</Breadcrumb.Item>
            </Breadcrumb>
            <AddCourseDiv>
                <Form onSubmit={addCourseProcess}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Course Code</Form.Label>
                        <Form.Control value={courseCode} onChange={(e)=>setCourseCode(e.target.value)} autoComplete="off" type="text" placeholder="Course code" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control value={courseName} onChange={(e)=>setCourseName(e.target.value)} autoComplete="off" type="text" placeholder="Course name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Section</Form.Label>
                        <Form.Control value={section} onChange={(e)=>setSection(e.target.value)} autoComplete="off" type="text" placeholder="Section" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label>Semester </Form.Label>
                        <Form.Control value={semester} onChange={(e)=>setSemester(e.target.value)} autoComplete="off" type="text" placeholder="Semester" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Course
                    </Button>
                </Form>
            </AddCourseDiv>
        </>
    )
}

const AddCourseDiv = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top: 5%;
`