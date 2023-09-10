import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import host from "../views/ui/utils";

function Signup({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [phoneno, setPhoneno] = useState("");

    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        // handle login logic here
        event.preventDefault();
        axios
            .post(`${host}/signup/student`, { FullName: fullname, Email: email, PhoneNo: phoneno, Password: password })
            .then((res) => {
               
                navigate('/');

            })
            .catch((err) => {
                console.log("Error", err);
                setShowError(true);
            });
    };
    console.log(email);
    return (
        <div className="Login">
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>  FullName </Form.Label>
                    <Form.Control
                        type="FullName"
                        placeholder="Enter FullName"
                        value={fullname}
                        onChange={(event) => setFullname(event.target.value)}
                    />
                </Form.Group>


                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="Email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>PhoneNo</Form.Label>
                    <Form.Control
                        type="PhoneNo"
                        placeholder="Enter PhoneNo"
                        value={phoneno}
                        onChange={(event) => setPhoneno(event.target.value)}
                    />
                </Form.Group>
                
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>
              
                <Button variant="primary" type="submit">
                    Signup
                </Button>

            </Form>
        </div>
    );
}

export default Signup;
