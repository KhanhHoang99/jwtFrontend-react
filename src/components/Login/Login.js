import React from 'react';
import "./Login.scss";
import {Link} from "react-router-dom";


function Login(props) {

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
                            <div class="form-group py-2">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div class="form-group py-2">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" placeholder="Password" />
                            </div>
                            <hr/>
                            <div className='d-flex justify-content-center py-2'>
                                <button type="submit" class="btn btn-primary">Login</button>
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