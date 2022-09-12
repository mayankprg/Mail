import React, {useContext, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthContext from '../context/authContext';



const axios = require('axios').default;


const ComposeForm = () => {

    let {user, authTokens} = useContext(AuthContext);

    let [email, setEmail] = useState({
        from: user.username,
        recipients: "",
        subject: "",
        body: "",
    })

    const handleSubmit = async (e)=>{
        e.preventDefault();
        let response = await axios.post(`http://127.0.0.1:8000/api/emails`,  { 
                recipients: email.recipients,
                body: email.body,
                subject: email.subject
            },
        { 
            headers:
                {
                    'Content-Type': 'application/json'
                    ,'Authorization': 'Bearer ' + String(authTokens.access)
                    
                }
        }
        ); 
        console.log(response)

    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>From:</Form.Label>
                <Form.Control type="email" disabled value={email.from.toString()} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>To:</Form.Label>
                <Form.Control type="email"  placeholder="Enter email"  
                value={email.recipients}
                onChange={e=>setEmail({...email, recipients: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="floatingTextarea2">
                <Form.Label>Subject:</Form.Label>
                <Form.Control 
                    as="textarea"
                    style={{height: '20px'}}
                    value={email.subject}
                    onChange={e=>{setEmail({...email, subject: e.target.value})}}
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="floatingTextarea2">
                <Form.Label>Body:</Form.Label>
                <Form.Control 
                    as="textarea"
                    style={{ height: '100px' }}
                    value={email.body}
                    onChange={e=>{setEmail({...email, body: e.target.value})}}
               />
            </Form.Group>
            <Button variant="primary" type="submit">
            Send
            </Button>
        </Form>
    )
}

export default ComposeForm