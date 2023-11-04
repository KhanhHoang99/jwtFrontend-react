import React, { useEffect, useState } from 'react';
import "./Nav.scss";
import {NavLink, useLocation} from "react-router-dom";


function Nav(props) {

    const [isShow, setIsShow] = useState(true);
    let location = useLocation();

    useEffect(() => {
        
        if(location.pathname === '/login') {
            setIsShow(false);
        }else {
            setIsShow(true);
        }

    }, [])

    return (
        <>
            {isShow && (
                <div className="topnav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </div>
            )}
        </>
    );
}

export default Nav;