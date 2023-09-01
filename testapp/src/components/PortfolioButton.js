import React from 'react';
import { Link } from 'react-router-dom';
import './PortfolioButton.css'; // Import the CSS

function PortfolioButton() {
  return (
    <Link to="/portfolio" className="portfolio-button">Back to portfolio</Link>
  );
}

export default PortfolioButton;