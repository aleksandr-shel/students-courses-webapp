import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Table, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function StudentList(){

    const navigate = useNavigate();
    const [studentList, setStudentList] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(async ()=>{
        await loadStudents()
    },[])

    async function loadStudents(){
        setShowLoading(true);
        const result = await axios.get('/api/users');
        setStudentList(result.data);
        setShowLoading(false);
    }

    async function studentDetails(studentId){
        navigate(`/student-info/${studentId}`)
    }

    return(
        <>
            {showLoading &&
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>}
            {studentList.length !== 0 ?
                <Table responsive style={{margin:'20px auto'}}>
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
                            <th></th>
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
                                <td>
                                    <Button className="btn-success" onClick={()=>studentDetails(item._id)}>
                                        Student info
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                :
                <div>
                    No students
                </div>
            }
            
        </>
    )
}