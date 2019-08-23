import React, { Component } from 'react';
import axios from 'axios';
import { Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import '../Css/Retails.css';



const RETAIL_API = 'https://bookbeauty.herokuapp.com/retails/:id.json'

class RetailProfile extends Component {
    constructor() {
        super();
        this.state = {
            user_id: localStorage.user_id,
            retail: {}
        };
    }

    componentDidMount() {
        const url = RETAIL_API.replace(":id", localStorage.user_id);
        axios.get(url).then((results) => {
            this.setState({ retail: results.data });
            console.log('retail:', results.data);
        });
    }

    render() {
        return (
            <div className="wrapperProfileRe">
                <Container>
                    <Row>
                        <Col></Col>
                        <Col xs={6}>
                            <ListGroup>
                                <ListGroup.Item><h3>{this.state.retail.retail_name}</h3></ListGroup.Item>

                                <ListGroup.Item><strong>PHONE:</strong> {this.state.retail.phone}</ListGroup.Item>

                                <ListGroup.Item><strong>ADDRESS:</strong> {this.state.retail.address1}, {this.state.retail.address2}</ListGroup.Item>

                                <ListGroup.Item><strong>SUBURB:</strong> {this.state.retail.suburb}</ListGroup.Item>

                                <ListGroup.Item><strong>POSTCODE:</strong> {this.state.retail.postcode}</ListGroup.Item>

                                <ListGroup.Item><strong>FACEBOOK:</strong> {this.state.retail.suburb}</ListGroup.Item>

                                <ListGroup.Item><strong>INSTAGRAM:</strong> {this.state.retail.indtagram}</ListGroup.Item>

                                <ListGroup.Item><strong>WEBSITE:</strong> {this.state.retail.website}
                                </ListGroup.Item>
                                <Button variant="outline-info" href={`#/editretail`}>Edit</Button>

                            </ListGroup>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default RetailProfile;