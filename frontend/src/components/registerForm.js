import React,{ useState, useContext } from 'react'
import './registerForm.css'
import AuthContext from '../context/authContext';
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";


const axios = require('axios').default;

const RegisterForm = () => {

    let [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    let {setUser, setAuthTokens, setLoading} = useContext(AuthContext);

    let navigate = useNavigate();

    const handleSubmit = async (event)=> {
        event.preventDefault();
        let errors = {};
        if (!values.password) {
            errors.password = "password required"
        }
        if (!values.confirmPassword) {
            errors.confirm = "confirmPassword required"
        }
        if (values.password !== values.confirmPassword) {
            errors.match = "passwords do not match"
        }

        const formData = new FormData();
        formData.append('username',values.email)
        formData.append('password',values.password)
        formData.append('confirmPassword',values.confirmPassword)
        
        let response = await axios.post("http://127.0.0.1:8000/api/signup/", formData)
        
        if (response.status === 201) {
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));
            localStorage.setItem('authnTokens', JSON.stringify(response.data));
            navigate('/');
            setLoading(false);
        }   else {
            console.log("somithing went wrong")
        }
    }



  return (
      <div className='registerform'>
        <p>Make An Account</p>
        
         <form onSubmit={handleSubmit}>
            <label>
                Email
                <input autoCapitalize='off'  type="email" name="Email" 
                value={values.email} 
                onChange={(event)=>setValues({...values, email: event.target.value})} />
            </label>
            <label>
                Password
                    <input autoCapitalize='off'  type="password" name="password" 
                    value={values.password} 
                    onChange={(event)=> setValues({...values, password: event.target.value})} />
            </label>
            <label>
                Confirm Password
                <input autoCapitalize='off'  type="password" name="confirmpassword" 
                value={values.confirmPassword} 
                onChange={(event)=>setValues({...values, confirmPassword: event.target.value})} />
            </label>
            <input type="submit" name="Signup" value="Sign up"/>
        </form>
    </div>
   )
}

export default RegisterForm