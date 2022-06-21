import * as React from "react"
import Logo from "../Logo/Logo"
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <div>Home</div>
      <div>About Us</div>
      <div>Contact Us</div>
      <div>Buy Now</div>
    </nav>
  )
}
