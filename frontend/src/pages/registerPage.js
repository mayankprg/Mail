import React from 'react'
import RegisterForm from '../components/registerForm'
import registerCSS from './registerPage.module.css'
import email from "../stockImages/email2.svg"

const RegisterPage = () => {
  return (
    <div className={registerCSS.regdiv}>
        <p>Welcome, Join Today</p>
        <div className={registerCSS.regformdiv}> 
          <img className={registerCSS.img} src={email} alt="stockImage" />
          <RegisterForm/>
        </div>
    </div>
  )
}

export default RegisterPage