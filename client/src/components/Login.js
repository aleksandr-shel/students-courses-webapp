import React, {useState} from 'react';
import axios from 'axios';
import { useToken } from './../auth/useToken';
import {useNavigate} from 'react-router-dom';
import styled  from 'styled-components';
import { useLoggedInContext } from '../Context/LoggedInContext';

export default function Login(){
    const [token, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');


    const navigate = useNavigate();

    const loggedInContext = useLoggedInContext()


    const onLogInClicked = async()=>{

        const result = await axios.post('/api/users/login',{
            email:emailValue,
            password: passwordValue
        })
        const {token} = result.data;
        setToken(token);
        loggedInContext.setLoggedIn(true);
        navigate('/')

    }



    return(
        <LoginForm>
            <div className="content-container">
                <h1>Log In</h1>
                {errorMessage && <div className="fail">{errorMessage}</div>}
                <input
                    onChange={e => setEmailValue(e.target.value)}
                    value={emailValue} 
                    placeholder="email@gmail.com"/>
                <input
                    value = {passwordValue}
                    onChange={e => setPasswordValue(e.target.value)} 
                    type="password"
                    placeholder="password"/>
                <hr/>
                <button
                    disabled = {!emailValue || !passwordValue}
                    onClick={onLogInClicked}>Log In</button>
                <button onClick={()=>navigate('/register')}>Don't have an account? Register</button>
            </div>
        </LoginForm>
    )
}


const LoginForm = styled.div`
    justify-content:center;
    align-content: center;
    display:flex;
    .content-container{
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-content: center;
        padding: 10vh;
    }

    .content-container input {
        margin: 5px;
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
        margin: 10px auto;
        padding: 8px 16px;
        border: none;
        background: #333;
        color: #f2f2f2;
        text-transform: uppercase;
        letter-spacing: .09em;
        border-radius: 6px;
    }
`