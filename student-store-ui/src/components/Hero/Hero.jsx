import React from 'react';
import './Hero.css';
import Icon from "../../student_store_icon.18e5d61a.svg"

const Hero = () => {
  return (
    <div className="hero">
      <div class="content">
        <div class="intro">
          <h1>Welcome!</h1>
          <h1>Find Your Merch!</h1>
          <p>
            We have all kinds of goodies. Click on any of the items to start
            filling up your shopping cart. Checkout whenever you're ready.
          </p>
        </div>
        <div class="media">
          <img
            src={Icon}
            alt="hero"
            class="hero-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
