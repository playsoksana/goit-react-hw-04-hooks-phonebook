import React from 'react';
import PropTypes from 'prop-types';
import styles from './Contact.module.css';

const Contact = ({ name, number, id, deleteContactOnClick }) => (
  <li className={styles.item}>
    <p className={styles.name}>{name}:</p>
    <p className={styles.number}>{number}</p>
    <button
      className={styles.button}
      onClick={() => {
        deleteContactOnClick(id);
      }}
      type="button"
    >
      Delete contact
    </button>
  </li>
);
export default Contact;

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContactOnClick: PropTypes.func.isRequired,
};
