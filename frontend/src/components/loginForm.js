import React, { useState, useContext } from 'react'
import loginCSS from './login.module.css'
import AuthContext from '../context/authContext';
import { Link } from "react-router-dom";

const LoginForm = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState(null);

    let {loginUser} = useContext(AuthContext);

    let handleSubmit = event =>{
        event.preventDefault();
        loginUser(credentials)
        .then(response => {
            if (response === "error"){
                setErrors("Password /or Username Invalid!")
            }
        })
 
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
                {errors &&<p className={loginCSS.error}>{errors}</p>}
            </form>
            <p>Don't have an account? </p>
            <div className={loginCSS.divider}>
                
            </div>
            <Link to="/register">Sign up</Link>
        </div>

    )
}

export default LoginForm;
