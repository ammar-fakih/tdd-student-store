import React from 'react';
import Codepath from '../../../../codepath.f1b3e41a.svg';
import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    <div>
      <NavLink to="/">
        <img src={Codepath} />
      </NavLink>
    </div>
  );
};

export default Logo;
