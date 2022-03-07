import React from "react";
import {Link, Outlet} from 'react-router-dom';
import { Navbar, Nav, Container, Button} from "react-bootstrap";
import { useLoggedInContext } from "../Context/LoggedInContext";
import { useEffect } from "react";
import { useUser } from './../auth/useUser';
import styled from 'styled-components';


export default function Layout(){


    const loggedInContext = useLoggedInContext()

    const user = useUser();

    function onLogout(){
        localStorage.removeItem('token');
        loggedInContext.setLoggedIn(false);
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href='/'>List of Courses</Nav.Link>
                        {
                            loggedInContext.loggedIn ?
                            <>
                                <Nav.Link href='/list-students'>List of Students</Nav.Link>
                                <Nav.Link href='/student-account'>Student Account</Nav.Link>
                                <Button className="btn-dark" style={{color:'#bebebe'}} onClick={onLogout}>Logout</Button>
                            </>
                            :
                            <>
                                <Nav.Link href='/login'>Login</Nav.Link>
                                <Nav.Link href='/register'>Register</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                <Outlet/>
            </div>
        </>
    )
}
