import React from "react";
import axios from 'axios';
import { useUser } from './../auth/useUser';
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import styled from "styled-components";
import { Breadcrumb } from "react-bootstrap";
import { useToken } from './../auth/useToken';

export default function UpdateStudentAccountForm(){

    const user = useUser();
    const [student, setStudent] = useState(user);
    const navigate = useNavigate();
    const [token, setToken] = useToken();

    function handleUpdateInputs(e){
        const name = e.target.name;
        const value = e.target.value;
        setStudent(student => ({...student, [name]: value }))
    }

    function UpdateStudentInfo(){
        if (isEmpty(student)){
            console.log('Each field should be filled')
            return;
        }
        axios.put(`/api/users/update/${user.id}`, student, {headers:{Authorization: `Bearer ${token}`}}).then(result=>{
            if (result.data){
                setToken(result.data);
                navigate('/student-account')
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    function isEmpty(obj) {
        return Object.keys(obj).some(item => item.length == 0);
    }

    return(
        <UpdateStudentForm>
            <Breadcrumb style={{background:"none",color: 'black'}}>
                <Breadcrumb.Item style={{color: 'blue'}} href="/">Courses list</Breadcrumb.Item>
                <Breadcrumb.Item style={{color: 'blue'}} href="/student-account">Student Account</Breadcrumb.Item>
                <Breadcrumb.Item active>Update Student Account</Breadcrumb.Item>
            </Breadcrumb>
            <h1 style={{textAlign:'center'}}>Update Your Information</h1>
            <div className="form-container">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Email: </label>
                            </td>
                            <td>
                                <input
                                type="email"
                                name="email"
                                placeholder="email@gmail.com"
                                value={student.email}
                                onChange={handleUpdateInputs}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Password: </label>
                            </td>
                            <td>
                                <input
                                type="password"
                                name="password"
                                placeholder="password"
                                value={student.password}
                                onChange={handleUpdateInputs}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Firstname: </label>
                            </td>
                            <td>
                                <input
                                type="text"
                                placeholder="Firstname"
                                name="firstName"
                                value={student.firstName}
                                onChange={handleUpdateInputs}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Lastname: </label>
                            </td>
                            <td>
                                <input
                                type="text"
                                name="lastName"
                                placeholder="Lastname"
                                value={student.lastName}
                                onChange={handleUpdateInputs}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Address: </label>
                            </td>
                            <td>
                                <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={student.address}
                                onChange={handleUpdateInputs}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>City: </label>
                            </td>
                            <td>
                                <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={student.city}
                                onChange={handleUpdateInputs}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Phone Number: </label>
                            </td>
                            <td>
                                <input
                                type="tel"
                                placeholder="Phone number"
                                name="phoneNumber"
                                value={student.phoneNumber}
                                onChange={handleUpdateInputs}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Program: </label>
                            </td>
                            <td>
                                <input
                                type="text"
                                placeholder="Program"
                                name="program"
                                value={student.program}
                                onChange={handleUpdateInputs}/>
                            </td>
                        </tr>
                        <tr className="form-btns">
                            <td>
                                <button onClick={UpdateStudentInfo}>
                                    Update my info
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </UpdateStudentForm>
    )
}


const UpdateStudentForm = styled.div`
    .form-container{
        padding: 10vh;
    }

    .form-container > table{
        margin: 0px auto;
    }

    .form-container input {
        margin: 5px;
    }

    td{
        text-align: center;
    }

    input{
        border: 1px solid black;
        border-radius: 8px;
        display: inline-block;
        font-size: 16px;
        margin: 8px auto;
        padding: 8px;
    }
    button {
        cursor: pointer;
        margin: auto;
        padding: 8px 16px;
        border: none;
        background: #333;
        color: #f2f2f2;
        text-transform: uppercase;
        letter-spacing: .09em;
        border-radius: 6px;
    }
`