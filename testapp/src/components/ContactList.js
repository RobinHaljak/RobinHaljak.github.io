// src/Docs.js
import React from 'react';
import './ContactList.css'
import ImageComponent from './ImageComponent';
import ContactElement from './ContactElement'

function ContactList() {

    const vertical_containerPadding = '0';
    const vertical_containerMargin = '0';
    const containerPadding = '2rem';
    const containerMargin = '50px';

    return (
        <div className='text-contactlist'>
            <div className='vertical-container' style={{
                padding: vertical_containerPadding,
                margin: vertical_containerMargin
            }}>
                <ContactElement imageUrl="/images/github.png" altText = "GitHub Icon" imText="GitHub" refUrl = "https://github.com/RobinHaljak/" imageUrl_="/images/linkedin.png"  altText_ = "LinkedIn Icon" imText_="Linkedin" refUrl_ = "https://www.linkedin.com/in/robin-haljak/" ></ContactElement>
                
                <ContactElement imageUrl="/images/twitter.png" altText = "Twitter Icon" imText ="Twitter" imageUrl_="/images/kaggle.png" altText_ = "Kaggle Icon" imText_="Kaggle"></ContactElement>
            
                <a href = "https://Haljak.Robin@gmail.com/" target="_blank" rel="noopener noreferrer" className='custom-hyperlink' >
            <div className='contact-element'>
                <ImageComponent
                    imageUrl="/images/gmail.png" 
                    altText="Haljak.Robin@gmail.com"
                    className="Uni-Image"
                    width="50px"
                    height="50px"
                    style={{ border: '0px solid #ccc', borderRadius: '2px' }}
                />
                <div className='element-text'>
                    
                    Haljak.Robin@gmail.com
                    
                </div>
            </div>
            </a>
            </div>
        </div>


    );
}

export default ContactList;