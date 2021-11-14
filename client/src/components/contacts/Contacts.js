import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
  const nodeRef = React.useRef(null)
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if(contacts.length === 0) {
    return <h4>Please add a contact</h4>
  }
  return (
    <>
      <TransitionGroup>
        {filtered !== null 
          ? filtered.map(contact => (
            <CSSTransition nodeRef={nodeRef} key={contact._id} timeout={550} classNames="item">
              <ContactItem contact={contact}/> 
            </CSSTransition>
            )) 
          : contacts.map(contact => (
            <CSSTransition nodeRef={nodeRef} key={contact._id} timeout={550} classNames="item" >
              <ContactItem contact={contact}/>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </>
  );
};

export default Contacts
