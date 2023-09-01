import React from 'react';
import './HeaderLogo.css';
import { Link } from 'react-router-dom';

function HeaderLogo() {
  return (
    <Link to="/">
      <img src="images/Logo_Bird1_192_crop.png" alt="Birb" className="header-logo-picture" />
    </ Link>
  );
}

export default HeaderLogo;
