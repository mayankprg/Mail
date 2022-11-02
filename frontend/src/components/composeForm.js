import React, {useContext, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthContext from '../context/authContext';
import ComposeCSS from './compose.module.css';
import { useLocation } from 'react-router-dom';
import Notification from '../utils/notification';


const axios = require('axios').default;


const ComposeForm = () => {

    const location = useLocation();
    const [notifications, setNotification] = useState([]);
    const {user, authTokens} = useContext(AuthContext);
    const [email, setEmail] = useState({
        from: user.username,
        recipients: location.state === null ? "":location.state.data.sender,
        subject: location.state === null  ? "":location.state.data.subject,
        body: location.state === null  ? "" :(location.state.data.body.startsWith("Re") ? 
                                                location.state.data.body: 
                                                `Re: ${location.state.data.body}`),
    })

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
                let response = await axios.post(`http://127.0.0.1/api/emails`,  { 
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
            )
        
            if (response.status === 201){
            
                setNotification([...notifications,
                        {
                            id: notifications.length, 
                            data: "Email sent",
                            type: "success",
                        }])
            } 
        } catch(err) {
            setNotification([...notifications,
                {
                    id: notifications.length, 
                    data: err.response.data.error,
                    type: "danger",
                }])
        }
       
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
                multiple
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
                    className={ComposeCSS['body']}
                    onChange={e=>{setEmail({...email, body: e.target.value})}}
               />
            </Form.Group>
            <Button variant="primary" type="submit">
            Send
            </Button>
            {
                notifications.map(({id, type, data})=>(
                <Notification 
                    data={data} 
                    key={id}
                    type={type} 
                />
           ))}
            
        </Form>
    )
}

export default ComposeForm