import React from 'react';
import "./Nav.scss";
import {NavLink, useLocation} from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';


function NavHeader(props) {

    const {user} = useContext(UserContext);
    const location = useLocation()

    

    if(user  && user.isAuthenticated || location.pathname === '/'){

        return (
            <>
                <div className='nav-header'>
                    <Navbar expand="lg" className="bg-body-tertiary header">
                        <Container>
                            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className='nav-link'>Home</NavLink>
                                    <NavLink to="/contact" className='nav-link'>Contact</NavLink>
                                    <NavLink to="/about" className='nav-link'>About</NavLink>
                                    <NavLink to="/users" className='nav-link'>Users</NavLink>
                                </Nav>
                                <Nav>
                                    <Nav.Item className='nav-link' href="#deets">Welcome Khanh</Nav.Item>
                                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Chang Password</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        );
    }else{
        return <></>
    }

}

export default NavHeader;