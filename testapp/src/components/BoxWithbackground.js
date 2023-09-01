import React, { useState } from 'react';
import './BoxWithBackground.css'; // Import your CSS file
import { Link } from 'react-router-dom';

function BoxWithBackground({ text, hoverText, linkUrl, imageUrl }) {
  const boxStyle = {
    backgroundImage: `url(${imageUrl})`,
  };
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link to={linkUrl} className="box" style={boxStyle} onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <span className={isHovered ? "box-text-hovered" : "box-text"}>{isHovered ? hoverText : text}</span>
    </Link>
  );
}

export default BoxWithBackground;
