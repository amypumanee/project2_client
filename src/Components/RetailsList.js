import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Accordion, Card, Container } from 'react-bootstrap';
import '../Css/Retails.css';

const RETAILS_LIST_API = 'https://bookbeauty.herokuapp.com';
const GET_POST_RETAILS_LIST_API = `${RETAILS_LIST_API}/retails.json`;
const PUT_RETAILS_LIST_API = `${RETAILS_LIST_API}/retails/:id.json`;

class RetailsList extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: undefined,
      retails: [],
    };

    this.saveRetail = this.saveRetail.bind(this);
    this.editRetail = this.editRetail.bind(this);
  }

  componentDidMount() {
    axios.get(GET_POST_RETAILS_LIST_API).then((result) => {
      this.setState({ retails: result.data });
    });
  }
  saveRetail(data) {
    if (data.id) {
      const url = PUT_RETAILS_LIST_API.replace(':id', data.id);
      axios.put(url, data).then(() => {
        window.location.reload();
      });
    } else {
      axios.post(GET_POST_RETAILS_LIST_API, data).then(() => {
        window.location.reload();
      });
    }
  }

  editRetail(retails) {
    this.setState({ currentItem: retails })
  }

  render() {
    return (
      <div>
        <div>
          <Container>
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    + Add new retails
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <RetailsForm onSubmit={this.saveRetail} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Container>
        </div>
        <div className="container">
          {
            this.state.retails.map((r) => {
              return (
                <Card className="cardRetails" style={{ width: '30rem', display: "inline-block" }} key={r.id}>
                  <Card.Img variant="top" width='400px' height='225px' src={r.retail_image} />
                  <Card.Body>
                    <Card.Title className="titleCategory">{r.retail_name}</Card.Title>
                    <Card.Text className="infoRetails">{`Address: ${r.address1} ${r.address2}, ${r.suburb} ${r.postcode}`}</Card.Text>
                    <Accordion>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            <div>
                              <Button className="buttonEditRetail" variant="info" type="button" onClick={() => this.editRetail(r)}>Edit</Button>
                            </div>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body><RetailsForm currentItem={this.state.currentItem} onSubmit={this.saveRetail} /></Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>

                  </Card.Body>
                </Card>
              );
            })
          }
        </div>
      </div>
    );
  }
}

class RetailsForm extends Component {
  constructor(props) {
    super(props);
    // if i have currentItem it means I'm editing.
    // if not I'm adding currentItem 
    if (this.props.currentItem) {
      this.state = {
        form: this.props.currentItem
      };
    } else {
      this.state = {
        form: {
          retail_image: '',
          retail_name: '',
          address1: '',
          address2: '',
          suburb: '',
          postcode: '',
        }
      };
    }
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
  };

  _handleChange(event) {
    const newFormData = {
      [event.target.name]: event.target.value,
    }
    this.setState(({ form }) => {
      return {
        form: {
          ...form,
          ...newFormData,
        }
      };
    });
  }

  uploadWidget() {
    window.cloudinary.openUploadWidget({ cloud_name: 'dm9keau0d', upload_preset: 'o1da5zng' },
      (error, result) => {
        if (result) {
          const data = result[0];
          const newFormData = {
            retail_image: data.secure_url
          };
          this.setState(({ form }) => {
            return {
              form: {
                ...form,
                ...newFormData,
              }
            };
          });
        }
      });
  }

  _handleSubmit(event) {
    event.preventDefault();
    const { form } = this.state;
    const data = {
      retail_name: form.retail_name,
      retail_image: form.retail_image,
      address1: form.address1,
      address2: form.address2,
      suburb: form.suburb,
      postcode: form.postcode
    };
    // if form has id it means I'm editing
    if (form.id) {
      data.id = form.id;
    }

    this.props.onSubmit(data);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const currentItemPropsHasBeenChanged =
      nextProps.currentItem !== this.props.currentItem;
    const formStateHasBeenChanged = nextState.form !== this.state.form;

    if (currentItemPropsHasBeenChanged) {
      this.setState({ form: nextProps.currentItem });
    }
    return currentItemPropsHasBeenChanged || formStateHasBeenChanged;
  }

  render() {
    const { form } = this.state;

    return (

      <Form onSubmit={this._handleSubmit}>
        <Form.Group controlId="formGridAddress1">
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="Retail Name" name="retail_name" value={form.retail_name} onChange={this._handleChange} maxLength="100" required />
        </Form.Group>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address 1</Form.Label>
          <Form.Control placeholder="Unit" name="address1" value={form.address1} onChange={this._handleChange} maxLength="200" required />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Street" name="address2" value={form.address2} onChange={this._handleChange} />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Suburb</Form.Label>
          <Form.Control placeholder="Surbub" name="suburb" value={form.suburb} onChange={this._handleChange} maxLength="200" required />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Postcode</Form.Label>
          <Form.Control placeholder="Postcode" name="postcode" value={form.postcode} onChange={this._handleChange} maxLength="4" required />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label><strong>Image</strong></Form.Label>
          <Form.Control type="text" name="retail_image" value={form.retail_image} readOnly="true" />
          <Button onClick={this.uploadWidget}>Select Image</Button>
        </Form.Group>

        <Button variant="secondary" type="submit">Save</Button>
      </Form >

    );
  }
}

export default RetailsList;

