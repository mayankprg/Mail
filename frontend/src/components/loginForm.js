import React, { useState, useContext } from 'react'
import loginCSS from './login.module.css'
import AuthContext from '../context/authContext';
import { Link } from "react-router-dom";

const LoginForm = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    let {loginUser}  = useContext(AuthContext);

    let handleSubmit = event =>{
        event.preventDefault();
        loginUser(credentials)
    }




  return (

        <div className={loginCSS.loginform}>
            <p>Login</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input autoCapitalize='off'  type="email" name="Email" 
                    value={credentials.email} 
                    onChange={(event)=>setCredentials({...credentials, email: event.target.value})} />
                </label>
                <label>
                    Password
                        <input autoCapitalize='off'  type="password" name="password" 
                        value={credentials.password} 
                        onChange={(event)=> setCredentials({...credentials, password: event.target.value})} />
                </label>
                <input type="submit" name="login" value="Login"/>
            </form>
            <Link to="/register">Sign up</Link>
        </div>

    )
}

export default LoginForm;
