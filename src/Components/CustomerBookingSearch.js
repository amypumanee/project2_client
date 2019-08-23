import React, { Component } from 'react';
import { Button, Form, Container, Card, Col } from "react-bootstrap";
import axios from 'axios';
import '../Css/Customer.css';

const SERVICES_URL = 'https://bookbeauty.herokuapp.com/services.json';
const CATEGORIES_URL = 'https://bookbeauty.herokuapp.com/categories.json';

class CustomerBookingSearch extends Component {
  constructor() {
    super();
    this.state = {
      services: []
    };
    this.fetchServices = this.fetchServices.bind(this);
  }
  fetchServices = (categoryParam, suburbParam) => {
    axios.get(SERVICES_URL).then((results) => {
      let data = results.data.filter((s) => {
        return (s.category_id === categoryParam
          && ((s.retail.suburb.toLowerCase() === suburbParam.toLowerCase())
            || (suburbParam === "" || s.retail.suburb.toLowerCase().startsWith(suburbParam.toLowerCase()))
          )
        )
      });
      this.setState({ services: data });
    })
  };

  render() {
    return (
      <div>
        <Container>
          <SearchForm onSubmit={this.fetchServices} />
          <SearchResult services={this.state.services} />
        </Container>
      </div>
    );
  }
}

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      category_id: 0,
      suburb: ""
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }
  componentDidMount() {
    axios.get(CATEGORIES_URL).then((results) => {
      this.setState({ categories: results.data });
      this.setState({ category_id: results.data[0].id });

    });
  }
  _handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(Number(this.state.category_id), this.state.suburb);

  }
  render() {
    return (
      <div>
        <Container>
          <section className="retail-content" >
            <h2>Explore Services</h2>
            <form onSubmit={this._handleSubmit} >
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCategories">
                  <Form.Label>Categories</Form.Label>
                  <Form.Control as="select"
                    name="category_id"
                    value={this.state.category_id}
                    onChange={this._handleChange} >
                    {this.state.categories.map((c) =>
                      <option key={c.id} value={c.id}>{c.title}</option>)}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridSuburb">
                  <Form.Label>Suburb</Form.Label>
                  <Form.Control
                    type="text"
                    name="suburb"
                    placeholder="suburb"
                    onChange={this._handleChange}
                    value={this.state.suburb}
                  />
                </Form.Group>
                <Col>
                  <Button id="search" variant="info" type="submit">Search</Button>
                </Col>
              </Form.Row>

            </form>
          </section>
        </Container>
      </div>
    );
  }
}

class SearchResult extends Component {
  render() {
    return (
      <div>
        <Container>
          <section className="service-content">
            {
              this.props.services.map((s) => {
                return (
                  <div className="service-card" key={s.id}>
                    <Card style={{ width: '16rem' }}>
                      <Card.Img variant="top" width='300px' height='200px' src={s.service_image} />
                      <Card.Body>
                        <Card.Title className="titleCategory">{s.title}</Card.Title>
                        <Card.Text>{s.description} </Card.Text>
                        <Card.Text>Service price: ${s.price}</Card.Text>
                        <Card.Text><strong> {s.retail.retail_name} </strong></Card.Text>
                        <Card.Text><span role="img" aria-label="sheep">📍</span>{s.retail.address1}, {s.retail.address2}, {s.retail.suburb}</Card.Text>
                        <Card.Text><span role="img" aria-label="sheep">☎️</span> {s.retail.phone}</Card.Text>
                        <Button id="info" variant="outline-info" href={`#/retailshowservices/${s.retail.user_id}`}>
                          More Info
                    </Button>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            }
          </section>
        </Container>
      </div>
    );
  }
}

export default CustomerBookingSearch;
