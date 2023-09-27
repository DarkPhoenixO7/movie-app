import React from "react";
import { Button, Form } from "react-bootstrap";
const ReviewFrom=({handleSubmit, revText, lableText, defaultValue})=>{
    return(
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"> 
            <Form.Label>{lableText}</Form.Label>
            <Form.Control as="textarea" ref={revText} defaultValue={defaultValue} rows={3}/>

            </Form.Group>
            <Button variant="outline-info" onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}
export default ReviewFrom;