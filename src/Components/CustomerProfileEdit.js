import React, { Component } from 'react';
import CustomerForm from './CustomerForm';
import { Container, Row } from 'react-bootstrap';

import axios from 'axios';

import '../Css/Customer.css';

const CUSTOMER_API = `https://bookbeauty.herokuapp.com/customers/:id.json`

class CustomerProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.user_id,
      data: {}
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);

  }

  _handleChange(event) {
    const newData = {
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.setState(({ data }) => {
      return {
        data: {
          ...data,
          ...newData,
        }
      };
    });
  }


  _handleSubmit(event) {

    event.preventDefault();
    const info = this.state.data;
    const URL = CUSTOMER_API.replace(":id", localStorage.user_id);
    axios.put(URL, info).then(() => {
      this.props.history.go(-1);
    })
  }

  componentDidMount() {
    const url = CUSTOMER_API.replace(':id', localStorage.user_id);
    axios.get(url).then(result => {
      console.log(result.data);
      this.setState({ data: result.data });
    })
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-xl-center">
          <div className="wrapperProfileEdit">
            <CustomerForm
              customer={this.state.data}
              onTyping={this._handleChange}
              onSubmit={this._handleSubmit}
            />
          </div>
        </Row>
      </Container >
    );
  }
}

export default CustomerProfileEdit;
