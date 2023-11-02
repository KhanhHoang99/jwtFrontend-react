import React, { useEffect, useState } from 'react';
import "./Register.scss";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';

function Register(props) {


    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const isValidInputs = () => {
        if(!email) {
            toast.error("email is required");
            return false;
        }
        if(!validateEmail(email)){
            toast.error("email is not valid");
        }
        if(!phone) {
            toast.error("phone is required");
            return false;
        }
        if(!password) {
            toast.error("password is required");
            return false;
        }
        if(password !== confirmPassword) {
            toast.error("your password is not the same");
            return false;
        }
    }

    const handleRegister = (e) => {
        let check = isValidInputs();
    }

    return (
        <div className='login-container'>
            <div className='container'>
                <div className='row mt-3'>
                    <div className='content-left red d-none d-sm-block col-7'>
                        <div className='brand'>
                            Khanh
                        </div>
                        <div className='detail'>
                            Khanh high school
                        </div>
                    </div>
                    <div className='content-right green col-12 col-sm-5 '>
                        <form>
                            <div className="form-group py-2">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group py-2">
                                <label htmlFor="username">UserName</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="username" 
                                    placeholder="UserName"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="form-group py-2">
                                <label htmlFor="phone">Phone</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="phone" 
                                    placeholder="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="form-group py-2">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group py-2">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="confirmPassword" 
                                    placeholder="confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                />
                            </div>
                            <hr/>
                            <div className='d-flex justify-content-center'>
                                <button type="button" className="btn btn-primary" onClick={(e) => handleRegister(e)}>Register</button>
                            </div>
                        </form>
                        <div className='d-flex justify-content-center'>
                            <Link to="/login">you had an account?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;