import React, { Component } from 'react';
import { Form, Container, Button, Accordion, Card } from 'react-bootstrap';
import axios from 'axios';
import '../Css/Categories.css';


const CATEGORIES_API = 'https://bookbeauty.herokuapp.com/categories.json';

class CategoriesList extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };

    const fetchCategories = () => {
      axios.get(CATEGORIES_API).then((result) => {
        this.setState({ data: result.data });
      });
    };
    fetchCategories();
    this.saveNewCategory = this.saveNewCategory.bind(this);
  }
  saveNewCategory(data) {
    axios.post(CATEGORIES_API, data).then((result) => {
      this.setState({ data: [...this.state.data, result.data] })
      window.location.reload();
    });
  }

  render() {
    return (
      <div className="container">
        <Container >
          <Accordion>
            <Card >
              <Card.Header >
                <Accordion.Toggle className="addNewCategoryButton" as={Button} variant="link" eventKey="0">
                  + Add new category
              </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body ><AddNewCategory onSubmit={this.saveNewCategory} /></Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>

        {
          this.state.data.map((c) => {
            return (
              <div className="cardCategories" key={c.id}>

                <Card className="categorieList" style={{ width: '18rem', display: "inline-block" }}>
                  <Card.Img variant="top" width='700px' height='225px' src={c.image} />
                  <Card.Body>
                    <Card.Title className="titleCategory">{c.title}</Card.Title>
                    <Accordion>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="outline-info" variant="link" eventKey="0">
                            <div className="wrapperCategoriel">
                              <Button className="buttonEdit" variant="info" href={`#/categoryEdit/${c.id}`}>Edit</Button>

                            </div>
                          </Accordion.Toggle>
                        </Card.Header>
                      </Card>
                    </Accordion>

                  </Card.Body>
                </Card>
              </div>
            );
          })
        }
      </div >

    );

  }


}

class AddNewCategory extends Component {
  constructor() {
    super();
    this.state = { title: '', image: '' };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
  };

  _handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  _handleSubmit(event) {
    event.preventDefault();
    const data = { title: this.state.title, image: this.state.image }
    this.props.onSubmit(data)
  }

  uploadWidget = () => {
    window.cloudinary.openUploadWidget({ cloud_name: 'dm9keau0d', upload_preset: 'o1da5zng' },
      (error, result) => {
        if (result) {
          const data = result[0];
          this.setState({ image: data.secure_url });
        }
      });
  }

  render() {

    return (
      <div >
        <Form onSubmit={this._handleSubmit} >
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="New category" name="title" value={this.state.title} onChange={this._handleChange} required maxLength="100" />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control placeholder="Add Image URL ..." type="text" name="image" value={this.state.image} onChange={this._handleChange} readOnly="true"></Form.Control>
            <Button variant="info" onClick={this.uploadWidget.bind(this)}>Select Image</Button>
            {/* <Card style={{ width: '18rem', marginTop: '20px' }}>
              <Card.Img variant="top" width='400px' height='225px' src={this.state.image} />
            </Card> */}
          </Form.Group>
          <Button variant="info" type="submit">Save</Button>
        </Form>
      </div >
    )
  }
}

export default CategoriesList;










