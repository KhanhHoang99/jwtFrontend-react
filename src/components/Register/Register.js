import React, { useEffect, useState } from 'react';
import "./Register.scss";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import { registerNewUser } from '../../services/userService';
import { useHistory } from 'react-router-dom';

function Register(props) {


    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();

    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }

    const [objChectInput, setObjChectInput] = useState(defaultValidInput);



    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const isValidInputs = () => {
        
        setObjChectInput(defaultValidInput);

        if(!email) {
            toast.error("email is required");
            setObjChectInput({...defaultValidInput, isValidEmail: false});
            return false;
        }
        if(!validateEmail(email)){
            setObjChectInput({...defaultValidInput, isValidEmail: false});
            toast.error("email is not valid");
        }
        if(!phone) {
            setObjChectInput({...defaultValidInput, isValidPhone: false});
            toast.error("phone is required");
            return false;
        }
        if(!password) {
            setObjChectInput({...defaultValidInput, isValidPassword: false});
            toast.error("password is required");
            return false;
        }
        if(password !== confirmPassword) {
            setObjChectInput({...defaultValidInput, isValidPassword: false});
            toast.error("your password is not the same");
            return false;
        }

        return true;
    }

    const handleRegister = async (e) => {
        
        let check = isValidInputs();

        if(check) {

            let response = await registerNewUser(email, phone, userName, password);
            
            if(+response.errorCode === 0){
                toast.success(response.message)
                history.push('/login');
            }else{
                toast.error(response.message)
            }
        }
    
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
                                    className={objChectInput.isValidEmail ? "form-control" : "form-control is-invalid"}
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
                                    className={objChectInput.isValidPhone ? "form-control" : "form-control is-invalid"}
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
                                    className={objChectInput.isValidPassword ? "form-control" : "form-control is-invalid"} 
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
                                    className={objChectInput.isValidConfirmPassword ? "form-control" : "form-control is-invalid"} 
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