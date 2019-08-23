import React, { Component } from 'react';
import { Button, Form, Row, Container } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge'
import axios from 'axios';
import User from './User'
import '../Css/User.css';

const SERVER_URL = 'https://bookbeauty.herokuapp.com/users.json';
// const SERVER_URL = 'http://localhost:3000/users.json';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      user_type: 'CUSTOMER',
      errorMessage: ""
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }
  _handleSubmit(event) {
    event.preventDefault();
    const data = {
      email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation,
      user_type: this.state.user_type
    };
    axios.post(SERVER_URL, data).then((result) => {
      if (result.data) {
        const data = result.data;
        User.setEmail(data.email);
        User.setUserType(data.user_type);
        User.setUserId(data.id);
        this.props.history.push("/profile");
        window.location.reload();
      }
    }, (reason) => {
      if (reason && reason.response && reason.response.data) {
        const rejectReason = reason.response.data;
        const key = Object.keys(rejectReason)[0];
        this.setState({ errorMessage: `${key} ${rejectReason[key].join(", ")}` });
      }
    });
  }

  _handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <Container>
        <div className="wrapper">
          <Row className="justify-content-md-center">
            <h1>Sign up</h1>
          </Row>
          <Row className="justify-content-md-center">
            <form onSubmit={this._handleSubmit}>
              {
                this.state.errorMessage ? <Badge variant="danger">{this.state.errorMessage}</Badge> : ''
              }
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="type your email"
                  value={this.state.email}
                  onChange={this._handleChange}
                  required />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="type your password"
                  value={this.state.password}
                  onChange={this._handleChange}
                  required />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password confirmation:</Form.Label>
                <Form.Control
                  type="password"
                  name="password_confirmation"
                  placeholder="confirm your password"
                  value={this.state.password_confirmation}
                  onChange={this._handleChange}
                  required />
              </Form.Group>
              <Row className="justify-content-md-center">
                <Button variant="info" type="submit">Sign up</Button>
              </Row>
            </form>
          </Row>
        </div>
      </Container>
    );
  }
}

export default SignUp;
