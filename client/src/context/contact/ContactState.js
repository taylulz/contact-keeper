import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        "_id": "61797cef76fcd92f289c9a73",
        "user": "6178252692fd255b040eea0a",
        "name": "Melissa Williams",
        "email": "MelWill@gmail.com",
        "phone": "444-444-4444",
        "type": "personal",
        "date": "2021-10-27T16:23:11.663Z",
        "__v": 0
      },
      {
          "_id": "61797c7a76fcd92f289c9a6a",
          "user": "6178252692fd255b040eea0a",
          "name": "Ted Johnson",
          "email": "tedjohnson@gmail.com",
          "phone": "222-222-2222",
          "type": "personal",
          "date": "2021-10-27T16:21:14.448Z",
          "__v": 0
      },
      {
          "_id": "61797c5676fcd92f289c9a68",
          "user": "6178252692fd255b040eea0a",
          "name": "Sara Smith",
          "email": "ssmith@gmail.com",
          "phone": "333-333-3333",
          "type": "professional",
          "date": "2021-10-27T16:20:38.676Z",
          "__v": 0
      }
    ]
  };

  // state allows us to access anything in our state , and dispatch allows us to dispatch objects to our reducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact


  // Delete Contact


  // Set Current Contact


  // Clear Current Contact


  // Update Contact


  // Filter Contacts


  // Clear Filter

  return (
    // anything we want to be able to acces (e.g. state and actions) go here
    <ContactContext.Provider
     value={{
      contacts: state.contacts
     }}>
      { props.children }
    </ContactContext.Provider>
  )
};

export default ContactState;