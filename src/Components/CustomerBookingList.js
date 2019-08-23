import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from "react-bootstrap";
import '../Css/Customer.css';

const SERVER_URL = 'https://bookbeauty.herokuapp.com/bookings.json';
const SERVER_UPDATE_URL = 'https://bookbeauty.herokuapp.com/bookings/:id.json';

class CustomerBookingList extends Component {
  constructor() {
    super();
    this.state = {
      bookings: []
    };
  }

  componentDidMount() {
    axios.get(SERVER_URL).then((results) => {
      let login_id = Number(localStorage.user_id);
      let data = results.data.filter((b) => { return (b.user_id === login_id) || (localStorage.user_type === "ADMIN") }).sort((a,b)=>{
        return new Date(b.date) - new Date(a.date);
      })
      this.setState({ bookings: data });
    });
  }

  render() {
    return (
      <div>
        <BookingCancelForm data={this.state.bookings} />
      </div>
    );
  }
}

class BookingCancelForm extends Component {
  render() {
    return (
      <div className="container">
        <div className="wrapperCustomerBookingList">
          <h1>All bookings</h1>
          <Table striped size='sm' >
            <thead>
              <tr>
                <th>Booking Date</th>
                <th>Booking Time</th>
                <th>Customer Name</th>
                <th>Retail Name</th>
                <th>Service</th>
                <th>Service Image</th>
                <th>Duration</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.data.map((b) => {
                  return (
                    <tr key={b.id}>
                      <td>{b.date}</td>
                      <td>{b.booking_time}</td>
                      <td>{b.customer.full_name}</td>
                      <td>{b.retail.retail_name}</td>
                      <td>{b.service.title}</td>
                      <td> <img src={b.service.service_image} width="100" height="100" alt="" /></td>
                      <td>{b.service.duration}</td>
                      <td>{b.service.price}</td>
                      <td><CancelButton id={b.id} iscancel={b.iscancel} /></td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </div>
      </div>

    );
  }
}

class CancelButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iscancel: props.iscancel ? true : false
    }
    this._handleOnClick = this._handleOnClick.bind(this);
  }

  _handleOnClick(event) {
    let bookingId = Number(event.target.id);
    axios.get(SERVER_URL).then((response) => {
      let data = response.data.find((b) => { return b.id === bookingId });
      if (!data.iscancel) {
        data.iscancel = true;
        let url = SERVER_UPDATE_URL.replace(":id", bookingId)
        axios.put(url, data).then((result) => {
          this.setState({ iscancel: result.data.iscancel });
          console.log("cancel success", this.state.iscancel);
        });
      }
    })
  }

  render() {
    return (
      <div>
        <Button variant="danger" id={this.props.id} onClick={this._handleOnClick} size="sm" disabled={this.state.iscancel}>Cancel</Button>
      </div>
    )
  };
}

export default CustomerBookingList;
