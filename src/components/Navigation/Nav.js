import React from 'react';
import "./Nav.scss";
import {NavLink, useLocation} from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';


function Nav(props) {

    const {user} = useContext(UserContext);
    const location = useLocation()

    

    if(user  && user.isAuthenticated || location.pathname === '/'){

        return (
            <>
                <div className="topnav">
                        <NavLink to="/" exact>Home</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/users">Users</NavLink>
                        <NavLink to="/login">Login</NavLink>
                </div>
            </>
        );
    }else{
        return <></>
    }

}

export default Nav;