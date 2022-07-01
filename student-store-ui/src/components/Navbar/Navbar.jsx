import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Logo from '../Logo/Logo';
import './Navbar.css';

export default function Navbar({ handleOnToggle }) {
  return (
    <nav className="navbar">
      <div className="navbar-contents">
        <Logo />
        <div>
          <NavLink
            className={({ isActive }) => {
              return `navbar-link ${isActive ? 'active-link' : ''}`;
            }}
            to="/">
            Home
          </NavLink>
        </div>
        <div>
          <a href="#About" className="navbar-link">
            About Us
          </a>
        </div>
        <div>
          <a href="#Contact" className="navbar-link">
            Contact Us
          </a>
        </div>
        <div>
          <NavLink
            className={({ isActive }) => {
              console.log(isActive);
              return `navbar-link ${isActive ? 'active-link' : ''}`;
            }}
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
