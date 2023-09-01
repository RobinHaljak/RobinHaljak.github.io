// src/Docs.js
import React from 'react';
import Header from './Header';
import ContactList from './ContactList';
import './Contact.css'


function Contact() {
  return (
    <div>
    <div className='Contacts'>
        <Header />
      <h1>Contact Me</h1>
    </div>
    <div className='Contacts'>
  <ContactList />
</div>

</div>

  );
}

export default Contact;