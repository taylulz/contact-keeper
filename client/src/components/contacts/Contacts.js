import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
  const nodeRef = React.useRef(null)
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // esling-disable-next-line  
  }, []);

  if(contacts != null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>
  }
  return (
    <>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null 
            ? filtered.map(contact => (
                <CSSTransition 
                  nodeRef={nodeRef} 
                  key={contact._id} 
                  timeout={550} 
                  classNames="item"
                >
                  <ContactItem contact={contact}/> 
                </CSSTransition>
              )) 
            : contacts.map(contact => (
                <CSSTransition 
                  nodeRef={nodeRef} 
                  key={contact._id} 
                  timeout={550} 
                  classNames="item" 
                >
                  <ContactItem contact={contact}/>
                </CSSTransition>
            ))
          }
      </TransitionGroup>
      ) : <Spinner />}
    </>
  );
};

export default Contacts
