import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Styles from './Filter.module.css';

const Filter = ({ value, filterContacts }) => (
  <div className={Styles.Container}>
    <Input
      value={value}
      name="search"
      textLabel="Find contact by name"
      placeholder="Enter"
      onChangeInput={filterContacts}
    />
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  filterContacts: PropTypes.func.isRequired,
};

export default Filter;
