import React from "react";
import {useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useToken } from '../auth/useToken';
import axios from "axios";
import styled from "styled-components";
import { useLoggedInContext } from "../Context/LoggedInContext";

export default function Register(){

    const [token, setToken] = useToken();
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [program, setProgram] = useState('');

    const loggedInContext = useLoggedInContext()

    const navigate = useNavigate();


    function clearInputs(){
        setEmailValue('')
        setPasswordValue('')
        setFirstName('')
        setLastName('')
        setAddress('')
        setCity('')
        setPhoneNumber('')
        setProgram('')
    }
    async function onRegisterClicked(){
        const response = await axios.post('/api/users/register',{
            email: emailValue,
            password: passwordValue,
            firstName,
            lastName,
            address,
            phoneNumber,
            city,
            program
        })
        .catch(err=>{
            return;
        })

        console.log(response);
        const {token} = response.data;
        setToken(token);
        loggedInContext.setLoggedIn(true);
        navigate('/')
    }
    return (
        <RegisterForm>
            <h1 style={{textAlign:'center'}}>Register</h1>
            <div className="form-container"
                onKeyPress={(e)=>{if(e.key === 'Enter'){onRegisterClicked()}}}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Email: </label>
                            </td>
                            <td>
                                <input
                                type="email"
                                name="Email"
                                placeholder="email@gmail.com"
                                value={emailValue}
                                onChange={(e)=>setEmailValue(e.target.value)}/>
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
                                value={passwordValue}
                                onChange={(e)=>setPasswordValue(e.target.value)}/>
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
                                name="Firstname"
                                value={firstName}
                                onChange={(e)=>setFirstName(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Lastname: </label>
                            </td>
                            <td>
                                <input
                                type="text"
                                name="Lastname"
                                placeholder="Lastname"
                                value={lastName}
                                onChange={(e)=>setLastName(e.target.value)}/>
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
                                value={address}
                                onChange={(e)=>setAddress(e.target.value)}/>
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
                                value={city}
                                onChange={(e)=>setCity(e.target.value)}/>
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
                                value={phoneNumber}
                                onChange={(e)=>setPhoneNumber(e.target.value)}/>
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
                                value={program}
                                onChange={(e)=>setProgram(e.target.value)}/>
                            </td>
                        </tr>
                        <tr className="form-btns">
                            <td>
                                <button onClick={()=>{clearInputs()}}>
                                    Reset
                                </button>
                            </td>
                            <td>
                                <button onClick={onRegisterClicked}>
                                    Register
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button onClick={()=>navigate('/login')}>
                                    Already have an account? Login
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </RegisterForm>
    )
}


const RegisterForm = styled.div`
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