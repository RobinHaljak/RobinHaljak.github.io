import React from 'react';
import ImageComponent from './ImageComponent';



function Education() {
  return (
    <ImageComponent
  imageUrl="/images/Uni1.png"
  altText="University Icon"
  className="Uni-Image"
  width="140px"
  height="140px"
  style={{ border: '1px solid #ccc', borderRadius: '10px' }}
/>
  );
}

export default Education;