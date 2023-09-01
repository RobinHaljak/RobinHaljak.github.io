import React from 'react';

function ImageComponent(props) {
  const { imageUrl, altText, className, width, height, style } = props;

  const imageStyle = {
    width: width,
    height: height,
    ...style
  };

  return (
    <img src={imageUrl} alt={altText} className={className} style={imageStyle} />
  );
}

export default ImageComponent;