// src/Docs.js
import React from 'react';
import './ContactElement.css'
import ImageComponent from './ImageComponent';


function ContactElement(props) {
    const { imageUrl, altText, imText, refUrl, imageUrl_, altText_, imText_, refUrl_ } = props;

    // Need to pass the image url-s and alt-texts and names into this as variables
    return (
        <div className='text-contact'>
            <a href = {refUrl} target="_blank" rel="noopener noreferrer" className='custom-hyperlink' >
            <div className='contact-element'>
                <ImageComponent
                    imageUrl={imageUrl} //"/images/github.png"
                    altText={altText}//"Github Icon"
                    className="Uni-Image"
                    width="50px"
                    height="50px"
                    style={{ border: '0px solid #ccc', borderRadius: '2px' }}
                />
                <div className='element-text'>
                    
                    {imText}
                    
                </div>
            </div>
            </a>
            <a href = {refUrl_} target="_blank" rel="noopener noreferrer" className='custom-hyperlink' >
            <div className='contact-element'>
                <ImageComponent
                    imageUrl={imageUrl_}//"/images/linkedin.png"
                    altText={altText_}
                    className="Uni-Image"
                    width="50px"
                    height="50px"
                    style={{ border: '0px solid #ccc', borderRadius: '2px' }}
                /> <div className='element-text'>
                    {imText_}
                </div>
            </div>
            </a>
        </div>
    );
}

export default ContactElement;