import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../Css/Customer.css';

class CustomerForm extends Component {

  render() {
    return (
      <Form onSubmit={this.props.onSubmit}>
        <Form.Group controlId="formGridAddress1">
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="Name" name="full_name" required maxLength="100" value={this.props.customer.full_name} onChange={this.props.onTyping} />

        </Form.Group>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="number" placeholder="000-000-000" name="phone" value={this.props.customer.phone} onChange={this.props.onTyping} required maxLength="100" />
        </Form.Group>

        <Button variant="info" type="submit">Submit</Button>
      </Form >
    );
  }
}

export default CustomerForm;
