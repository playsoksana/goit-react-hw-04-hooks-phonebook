import React from 'react';
import PropTypes from 'prop-types';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';

const ContactList = ({ deleteContactOnClick, contactsRender, contacts }) => {
  const Content = contacts.length ? (
    contactsRender.length ? (
      <ul className={styles.contacts}>
        {contactsRender.map(({ name, number, id }) => (
          <Contact
            key={id}
            deleteContactOnClick={deleteContactOnClick}
            name={name}
            number={number}
            id={id}
          />
        ))}
      </ul>
    ) : (
      <p className={styles.notification}>
        There is no such name in the database{' '}
      </p>
    )
  ) : (
    <>
      <p className={styles.notification}>"The phone book is empty"</p>
      <img
        src="https://homsk.com/upload/media/posts/2020-05/16/krik-mona-liza-i-dr-o-chem-rasskazyvayut-samye-smeshnye-memy-po-motivam-shedevrov-izobrazitelnogo-iskusstva_1589644460-b.jpg"
        alt="a cat and woman"
      ></img>
    </>
  );
  return Content;
};

ContactList.propTypes = {
  contactsRender: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  deleteContactOnClick: PropTypes.func.isRequired,
};

export default ContactList;
