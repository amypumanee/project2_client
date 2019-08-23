import React, { Component } from 'react';
import { Button, Form, Container, Row, Badge } from "react-bootstrap";
import User from './User'
import axios from 'axios';
import '../Css/User.css';

const SERVER_URL = 'https://bookbeauty.herokuapp.com/login.json';
class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            user_type: "",
            errorMessage: ""
        };
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }
    _handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    _handleSubmit(event) {
        event.preventDefault();
        const data = { email: this.state.email, password: this.state.password};
        axios.post(SERVER_URL, data).then((result) => {
            if (result){
                const loginUser = result.data;
                User.setEmail(loginUser.email);
                User.setUserType(loginUser.user_type);
                User.setUserId(loginUser.id);
                this.props.history.push("/");
                window.location.reload();
            }
        }, ()=>{
            this.setState({errorMessage: "Invaid email or password"});
        });
    }
    render() {
        return (
            <Container>
                <div className="wrapper">

                    <Row className="justify-content-md-center">
                        {
                            this.state.errorMessage ? <Badge variant="danger">{this.state.errorMessage}</Badge> : ''
                        }
                    </Row>
                    <Row className="justify-content-md-center">
                        <h1>Sign in</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <form onSubmit={this._handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="type your email"
                                    onChange={this._handleChange}
                                    value={this.state.email}
                                    required />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="type your password"
                                    onChange={this._handleChange}
                                    value={this.state.password}
                                    required />
                            </Form.Group>
                            <Row className="justify-content-md-center">
                                <Button variant="info" type="submit">
                                    Sign in
                                </Button>
                            </Row>
                        </form>
                    </Row>
                </div>
            </Container>
        );
    }
}
export default Signin;