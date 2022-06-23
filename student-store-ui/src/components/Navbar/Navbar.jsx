import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-contents">
        <Logo />
        <div><NavLink style={{textDecoration: "none", color: "white"}} to="/">Home</NavLink></div>
        <div>About Us</div>
        <div>Contact Us</div>
        <div>Buy Now</div>
      </div>
    </nav>
  );
}
