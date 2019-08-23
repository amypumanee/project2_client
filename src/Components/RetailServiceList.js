import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, Container, Form, Button, Accordion, Card } from 'react-bootstrap';
import '../Css/Retails.css';

const SERVICES_API = "https://bookbeauty.herokuapp.com/services.json"
const CATEGORIES_API = "https://bookbeauty.herokuapp.com/categories.json"
const SERVICES_UPDATE_API = "https://bookbeauty.herokuapp.com/services/:id.json"
const Login_id = Number(localStorage.user_id);
class RetailServiceList extends Component {
  constructor() {
    super();
    this.state = {
      services: [],
      categories: []
    }

    const fetchServices = () => {
      axios.get(SERVICES_API).then((results) => {
        let data = results.data.filter((s) => { return s.retail_id === Login_id });
        this.setState({ services: data });

      })
    }
    const fetchCategories = () => {
      axios.get(CATEGORIES_API).then((results) => {
        this.setState({ categories: results.data });
      })
    }
    fetchCategories();
    fetchServices();

    this.saveServices = this.saveServices.bind(this);
  }

  saveServices(data) {
    axios.post(SERVICES_API, data).then((result) => {
      this.setState({ services: [...this.state.services, result.data] })
      window.location.reload();
    })
  }

  render() {
    return (
      <div>
        <Container>
          <Accordion>
            <Card>
              <Card.Header className="dropform">
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  + Add new service
              </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body><AddServiceForm onSubmit={this.saveServices} categories={this.state.categories} /></Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>

        {this.state.services.map((s) => {
          return (
            <div key={s.id}>
              <Container>
                <ListGroup>
                  <ListGroup.Item>
                    <h5>{s.title}</h5>
                    <p><strong>Description:</strong> {s.description}</p>
                    <p><strong>Price:</strong> A$ {s.price}</p>
                    <p><strong>Duration:</strong> {s.duration} mins</p>
                    <Accordion>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            <UpdateButton id={s.id} >Edit</UpdateButton>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body><EditForm info={s} categories={this.state.categories} /></Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </ListGroup.Item>
                </ListGroup>
              </Container>
            </div>
          );

        })}
      </div>
    )
  }
}

class AddServiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      service_image: "",
      price: 0,
      duration: "",
      category_id: 0
    }

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.uploadWidgetAdd = this.uploadWidgetAdd.bind(this);
  }

  _handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  _handleSubmit(event) {
    event.preventDefault();
    const selectedCategoryId = this.state.category_id === 0 ? this.props.categories[0].id : this.state.category_id;
    const submitData = { title: this.state.title, description: this.state.description, price: this.state.price, category_id: selectedCategoryId, duration: this.state.duration, retail_id: Login_id, service_image: this.state.service_image }
    this.props.onSubmit(submitData);
  }

  uploadWidgetAdd() {
    window.cloudinary.openUploadWidget({ cloud_name: 'dm9keau0d', upload_preset: 'o1da5zng' },
      (error, result) => {
        if (result) {
          const data = result[0];
          this.setState({ service_image: data.secure_url });
        }
      });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this._handleSubmit}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label><strong>Title</strong></Form.Label>
            <Form.Control type="text" name="title" value={this.state.title} onChange={this._handleChange} maxLength="100" required />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label><strong>Description</strong></Form.Label>
            <Form.Control as="textarea" name="description" value={this.state.description} rows="4" maxLength="2000" onChange={this._handleChange} />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label><strong>Price</strong></Form.Label>
            <Form.Control type="number" name="price" value={this.state.price} onChange={this._handleChange} />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label><strong>Duration</strong></Form.Label>
            <Form.Control type="number" name="duration" value={this.state.duration} onChange={this._handleChange} required />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" name="category_id" value={this.state.category_id} onChange={this._handleChange}>
              {CategoryDropdown(this.props, "", this)}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label><strong>Image</strong></Form.Label>
            <Form.Control type="text" name="service_image" value={this.state.service_image} readOnly="true" />
            <Button variant="outline-info" onClick={this.uploadWidgetAdd}>Select Image</Button>
          </Form.Group>

          <Button variant="outline-info" type="submit">
            Save
          </Button>
        </Form>
      </div>
    );
  }
}

class UpdateButton extends Component {
  render() {
    return (
      <Button variant="outline-info" id={this.props.id}>Edit</Button>
    )
  }
}

const CategoryDropdown = (props, selectedCategoryId, thisObject) => {
  if (props.categories && props.categories.length > 0) {
    const defaultValue = selectedCategoryId ? selectedCategoryId : props.categories[0].id;
    return props.categories.map((c) => {
      return <option id={c.id} key={c.id} value={c.id} selected={c.id === defaultValue} >{c.title}</option>
    })
  }
}

class EditForm extends Component {
  constructor(props) {
    super();
    this.state = {
      service: {
        title: props.info.title,
        description: props.info.description,
        price: props.info.price,
        duration: props.info.duration,
        category_id: props.info.category_id,
        service_id: props.info.id,
        service_image: props.info.service_image
      }
    }
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  uploadWidgetEdit = () => {
    window.cloudinary.openUploadWidget({ cloud_name: 'dm9keau0d', upload_preset: 'o1da5zng' },
      (error, result) => {
        if (result) {
          const data = result[0];
          const newData = {
            service_image: data.secure_url
          };
          this.setState(({ service }) => {
            return {
              service: {
                ...service,
                ...newData,
              }
            };
          });
        }
      });
  }

  _handleSubmit(event) {
    event.preventDefault();
    const data = this.state.service;
    const url = SERVICES_UPDATE_API.replace(":id", this.props.info.id);
    axios.put(url, data).then(() => {
      window.location.reload();
    })
  }

  _handleChange(event) {
    const newData = {
      [event.currentTarget.name]: event.currentTarget.value
    }

    this.setState(({ service }) => {
      return {
        service: {
          ...service,
          ...newData,
        }
      }
    })
  }

  render() {
    const { services } = this.state;
    if (services === null) {
      return null;
    }
    return (
      <div>
        <Form onSubmit={this._handleSubmit}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label><strong>Title</strong></Form.Label>
            <Form.Control type="text" name="title" value={this.state.service.title} onChange={this._handleChange} required />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label><strong>Description</strong></Form.Label>
            <Form.Control type="textarea" name="description" value={this.state.service.description} onChange={this._handleChange} />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label><strong>Price</strong></Form.Label>
            <Form.Control type="text" name="price" value={this.state.service.price} onChange={this._handleChange} />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label><strong>Duration</strong></Form.Label>
            <Form.Control type="text" name="duration" value={this.state.service.duration} onChange={this._handleChange} required />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" name="category_id" value={this.state.service.category_id} onChange={this._handleChange} >
              {CategoryDropdown(this.props, this.state.service.category_id)}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label><strong>Image</strong></Form.Label>
            <Form.Control type="text" name="service_image" value={this.state.service.service_image} readOnly="true" />
            <Button variant="info" onClick={this.uploadWidgetEdit}>Select Image</Button>
          </Form.Group>

          <Button variant="info" type="submit" id={this.state.service.service_id} onSubmit={this._handleSubmit}>
            Save
          </Button>

        </Form>
      </div>
    )
  }
}



export default RetailServiceList;
