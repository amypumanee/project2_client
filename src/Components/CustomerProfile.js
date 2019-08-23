import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Row } from 'react-bootstrap';
import '../Css/Customer.css';

const CUSTOMER_API = `https://bookbeauty.herokuapp.com/customers/:id.json`
// const CUSTOMER_API = `http://localhost:3000/customers/:id.json`;

class CustomerProfile extends Component {
    constructor() {
        super();
        this.state = {
            full_name: '',
            phone: ''
        }
    }

    componentDidMount() {
        const url = CUSTOMER_API.replace(":id", localStorage.user_id)
        axios.get(url).then(result => {
            console.log(result.data);
            this.setState(result.data);
        })
    }

    render() {
        return (

            <Container>
                <div className="container">
                    <Row className="justify-content-xl-center">
                        <div className="wrapperCustomerProfile">
                            <p>Fullname: {this.state.full_name}</p>
                            <p>Phone: {this.state.phone}</p>
                            <Button variant="info" href={`#/editcustomerprofile`}>Edit</Button>
                        </div>
                    </Row>
                </div>
            </Container >


        );
    }
}

export default CustomerProfile;
