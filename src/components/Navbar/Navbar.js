import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

// Navlink component
const Navlink = (props) => {
  const { link, name } = props;
  return (
    <Link to={link}>
      <div className="nav-link-container body2">{name}</div>
    </Link>
  );
};

// Side nav
const Navbar = (props) => {
  return (
    <div className="navbar-container">
      <Navlink name="Activity" link="/" />
      <Navlink name="Post" link="/new" />
    </div>
  );
};

export default Navbar;
