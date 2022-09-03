import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ComposeForm = () => {
  return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>From:</Form.Label>
                <Form.Control type="email" disabled placeholder="Enter email"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>To:</Form.Label>
                <Form.Control type="email"  placeholder="Enter email"  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="floatingTextarea2">
                <Form.Label>Subject:</Form.Label>
                <Form.Control 
                    as="textarea"
                    style={{ height: '20px' }}
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="floatingTextarea2">
                <Form.Label>Body:</Form.Label>
                <Form.Control 
                    as="textarea"
                    style={{ height: '100px' }}
               />
            </Form.Group>
            <Button variant="primary" type="submit">
            Send
            </Button>
        </Form>
  )
}

export default ComposeForm