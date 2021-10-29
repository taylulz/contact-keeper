import React, { useState, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

export const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const [contact, setContact] =  useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { name, email, phone, type } = contact;

  // copy the state with spread operator, target [attribute.name] from form, set value to [attribute.name] user input 
  const onChange = event => 
    setContact({ ...contact, [event.target.name]: event.target.value });
  
  const onSubmit = event => {
    event.preventDefault();
    // once form is submitted, it will look for addContact() function
    contactContext.addContact(contact);
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add Contact</h2>
      <input 
        type="text"
        placeholder="Name" 
        name="name" 
        value={name} 
        onChange={onChange}
      />
      <input 
        type="email"
        placeholder="Email" 
        name="email" 
        value={email} 
        onChange={onChange}
      />
      <input 
        type="phone"
        placeholder="Phone" 
        name="phone" 
        value={phone} 
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input 
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input 
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional
      <div>
        <input 
          type="submit" 
          value="Add Contact" 
          className="btn btn-primary btn-block" 
        />
      </div>
    </form>
  );
};


export default ContactForm