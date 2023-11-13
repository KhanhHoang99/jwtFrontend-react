import React, { useContext, useEffect, useState } from 'react';
import "./Login.scss";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import { loginUser } from '../../services/userService';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';



function Login(props) {

    const defaultValidInput = {
        isValidEmail: true,
        isValidPassword: true,
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [objChectInput, setObjChectInput] = useState(defaultValidInput);
    const history = useHistory();


    const {loginContext} = useContext(UserContext)
    

   

    const handleLogin = async () => {

        setObjChectInput(defaultValidInput);

        if (!email) {
            toast.error("please enter your email");
            setObjChectInput({...defaultValidInput, isValidEmail: false });
            return;
        }
    
        // Check if the password is valid
        if (!password) {
            toast.error("please enter your password");
            setObjChectInput({...defaultValidInput, isValidPassword: false });
            return;
        }

        await loginUser(email, password);
        
        let response = await loginUser(email, password);
        if(response && response.data) {
            
            if(+response.errorCode === 0){

                let email = response.data.email;
                let username = response.data.username;
                let token = response.data.access_token;

                let data = {
                    isAuthenticated: true,
                    token,
                    account: {email, username}
                }

                loginContext(data);

                // sessionStorage.setItem('account', JSON.stringify(data));

                toast.success(response.message);
                history.push('/users');
            }else{
                toast.error(response.message);
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
                    <div className='content-right green col-12 col-sm-5'>
                        <form>
                            <div className="form-group py-2">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    className={objChectInput.isValidEmail ? 'form-control' : 'is-invalid form-control'} 
                                    id="email" 
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group py-2">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    className={objChectInput.isValidPassword ? 'form-control' : 'is-invalid form-control'} 
                                    id="password" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <hr/>
                            <div className='d-flex justify-content-center py-2'>
                                <button type="button" className="btn btn-primary" onClick={() => handleLogin()}>Login</button>
                            </div>
                        </form>
                        <div className='d-flex justify-content-center'>
                            <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    );
}

export default Login;