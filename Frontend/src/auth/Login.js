import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom'; // Import Link and useHistory

import { Button, Form, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import host from "../views/ui/utils";
// comment
function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        // handle login logic here
        event.preventDefault();
        axios
            .post(`${host}/login/student`, { Email: email, Password: password })
            .then((res) => {
                console.log("response", res.data.data._id);
                if (res.data.token) {
                    // redirect to home page or do something else
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user_id', res.data.data._id);
                    localStorage.setItem('FullName', res.data.data.FullName);


                    // onLogin();
                    // history.push("/starter");
                    navigate('/assignment/list');
                }
                else {
                    setShowError(true);
                }
            })
            .catch((err) => {
                console.log("Error", err);
                setShowError(true);
            });
    };
    return (
        <div className="Login">
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="Email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
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
                    Submit
                </Button>
                {showError && (
                    <Alert variant="danger" className="mt-3">
                        Invalid email or password.
                    </Alert>
                )}
            </Form>

            <h6>
                Account not?{' '}
                <Link to="/signup">Sign up Here</Link>
            </h6>
        </div>
    );
}

export default Login;
