import React, { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthContext from '../context/authContext';

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

    const handleEmailChange = (event)=>{
        setCredentials({...credentials, email: event.target.value});
    }
        
    const handlePasswordChange = (event)=>{
        setCredentials({...credentials, password: event.target.value});
    }


  return (
        
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={credentials.email} onChange={handleEmailChange} />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={credentials.password} onChange={handlePasswordChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
        Login
        </Button>
    </Form>


  )
}

export default LoginForm;
