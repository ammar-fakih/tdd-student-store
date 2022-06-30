import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Navbar.css';

export default function Navbar({handleOnToggle}) {
  return (
    <nav className="navbar">
      <div className="navbar-contents">
        <Logo />
        <div>
          <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/">
            Home
          </NavLink>
        </div>
        <div>About Us</div>
        <div>Contact Us</div>
        <div>
          <NavLink
            style={{ textDecoration: 'none', color: 'white' }}
            to="/purchases">
            Orders
          </NavLink>
        </div>
        <div id="buy-now" onClick={handleOnToggle}>
          Buy Now
        </div>
      </div>
    </nav>
  );
}
