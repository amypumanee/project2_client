import React, { Component } from 'react';
// import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Css/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="wrapperFooter">
          <div className="iconFooter"><img src="https://png.pngtree.com/svg/20161008/24671b749c.png" alt="" width='25px' height='30px' />Beauk</div>
          <div></div>
          <small className="copyRight">© 2019</small>
        </div>


      </footer >
    );
  }
}
export default Footer;
