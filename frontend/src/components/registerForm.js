import React,{ useState, useContext } from 'react'
import SignupCSS from './registerForm.module.css'
import AuthContext from '../context/authContext';
import jwt_decode from "jwt-decode"
import { useNavigate, Link } from "react-router-dom";


const axios = require('axios').default;

const RegisterForm = () => {
    
    const navigate = useNavigate();
    const {setUser, setAuthTokens, setLoading} = useContext(AuthContext);

    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });        

  

    const[errors, setErrors]= useState({
        password: null,
        confirm: null,
        match: null,
        email: null,
    });



    const handleSubmit = async (event)=> {
        event.preventDefault();

        if (!values.password) {
            console.log("eeee")
            setErrors({...errors, password: "*password required"})
        }
        if (!values.confirmPassword) {
            setErrors({...errors, confirm: "*confirmPassword required"})
        }
        if (values.password !== values.confirmPassword) {
            setErrors({...errors, match: "*passwords do not match"})
        }
        if (!Object.values(errors).join('')){
            try {
                let response = await axios.post("http://127.0.0.1:8000/api/signup/",{
                    username: values.email,
                    password:values.password,
                    confirmPassword:values.confirmPassword
                });
                if (response.status === 201) {
                    setAuthTokens(response.data);
                    setUser(jwt_decode(response.data.access));
                    localStorage.setItem('authnTokens', JSON.stringify(response.data));
                    navigate('/');
                    setLoading(false);
                } else {
                    setErrors({...errors, email: response.data.username})
                }
            } catch (err) {
                setErrors({...errors, password: err.response.data.password})
            }
         
        }    
    }

  

  return (
      <div className={SignupCSS.registerform}>
        <p>Make An Account</p>
        
         <form onSubmit={handleSubmit}>
            <label>
                Email
                <input autoCapitalize='off'  type="email" name="Email" 
                value={values.email} 
                onChange={(event)=>setValues({...values, email: event.target.value})} />
            </label>
            {errors.email && <p  className={SignupCSS.errors}>{errors.email}</p>}
            <label>
                Password
                    <input autoCapitalize='off'  type="password" name="password" 
                    value={values.password} 
                    onChange={(event)=> setValues({...values, password: event.target.value})} />
            </label>
           {errors.password && <p  className={SignupCSS.errors}>{errors.password}</p>}
           {errors.match && <p className={SignupCSS.errors}>{errors.match}</p>}
            <label>
                Confirm Password
                <input autoCapitalize='off'  type="password" name="confirmpassword" 
                value={values.confirmPassword} 
                onChange={(event)=>setValues({...values, confirmPassword: event.target.value})} />
            </label>
            {errors.confirmPassword && <p className={SignupCSS.errors}>{errors.confirmPassword}</p>}
            {errors.match && <p className={SignupCSS.errors}>{errors.match}</p>}
            <input type="submit" name="Signup" value="Sign up"/>
            <div className={SignupCSS.divider}></div>
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
        </form>

       
    </div>
   )
}

export default RegisterForm