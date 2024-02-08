import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className='footer-container'>
        <h4 className='footer-title'>
          All Right Reserved &copy; niyas
        </h4>
        <p className="footer-items">
          <Link to='/about' className="footer-link">About</Link>
          <Link to='/contact' className="footer-link">Contact</Link>
          <Link to='/policy' className="footer-link">Policy</Link>
        </p>
      </div>
    );
  }
}

export default Footer;
