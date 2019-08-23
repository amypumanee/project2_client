import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../Css/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (

      <>
        <HomeCarousel />
        <main className="mainHome">
          < div className="container">
            <section className="home-content">
              <h2>Beauk is your beauty website</h2>
              <p className="icon"><img src="https://image.flaticon.com/icons/svg/34/34148.svg" alt="" width='30px' height='35px' ></img> Search</p>
              <p className="icon"><img src="https://cdn4.iconfinder.com/data/icons/hotel-and-reservation-services-outline/64/booking_online-512.png" alt="" width='50px' height='40px' ></img>Booking</p>
              <p className="icon"><img src="https://png.pngtree.com/svg/20160704/7d1563919c.png" alt="" width='50px' height='40px' ></img>Feel Pretty</p>
              <p>Beauk provides you with a quick and easy way to book your next beauty.
                It is simple. Search online. Book instantly. Enjoy your treatment!</p>
              <p>
                With Beauk you can search, book with immediate confirmation.
                We securely process thousands of bookings each week for happy customers all around
                the Sydney, and our friendly support team is always ready to help out should you
              need them.</p>
            </section>
          </div>
        </main>
      </>
    );
  }
}

class HomeCarousel extends Component {
  render() {
    return (
      <div className="container">

        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://geebeauty.com.au/wp-content/themes/gee/img/services-hands.jpg"
              alt="First slide"
              width='800px' height='450px'
            />
            <Carousel.Caption>
              <h3 className="pHome">Explore Treatments</h3>
              <p className="pHome">Nails</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://toplevelsalon.com/wp-content/uploads/b2b/stock/v2/bigstock/bigstock-Beautiful-lady-with-long-brown-12127595.jpg?&a=t"
              alt="Third slide"
              width='800px' height='450px'
            />
            <Carousel.Caption>
              {/* <h3>Second slide label</h3> */}
              <p className="pHome">Hairdressing</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://stylemagazines.com.au/wp-content/uploads/2015/01/shutterstock_232611751.jpg"
              alt="Third slide"
              width='800px' height='450px'
            />

            <Carousel.Caption>
              {/* <h3>Third slide label</h3> */}
              <p className="pHome">Eyes, Brows & Lashes</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

      </div>
    );
  }
}
export default Home;


