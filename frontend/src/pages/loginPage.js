import React from 'react'
import LoginForm from '../components/loginForm';
import loginCss from './loginPage.module.css';
import email from '../stockImages/email2.svg'




const loginPage = () => {
  return (
    <div  className={loginCss.logindiv}>
      <p>Welcome, Again</p>
        <div className={loginCss.loginformdiv}> 
          <img className={`${loginCss.img}`}
          onLoad={(event)=> {
            event.target.classList.toggle(loginCss.animate);
          }}
          src={email} alt="stockImage" />
          <LoginForm />
          
        </div>
    </div>
  )
}

export default loginPage