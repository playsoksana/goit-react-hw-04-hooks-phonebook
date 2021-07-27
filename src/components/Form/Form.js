import { useState } from 'react';
import Button from '../Button';
import { v4 as uuidv4 } from 'uuid';
import styles from './Form.module.css';
import Input from '../Input';
import PropTypes from 'prop-types';

const Form = ({ onSubmit, setIsVisibleModal, checkContactForRepetition }) => {
  const [state, setState] = useState({ name: '', number: '' });

  const onChangeInput = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const addContactOnPhonebook = ev => {
    ev.preventDefault();

    const {
      target: { name, number },
    } = ev;

    if (checkContactForRepetition(name.value)) {
      return;
    }
    setIsVisibleModal(false);
    onSubmit({
      name: name.value,
      number: number.value,
      id: uuidv4(),
    });
    clearInput();
  };

  function clearInput() {
    setState({ name: '', number: '' });
  }

  return (
    <form className={styles.form} onSubmit={addContactOnPhonebook}>
      <div className={styles.container}>
        <Input
          id="name"
          value={state.name}
          placeholder=" "
          onChangeInput={onChangeInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          textLabel="name"
        />
      </div>

      <div className={styles.container}>
        <Input
          id="number"
          value={state.number}
          placeholder=" "
          onChangeInput={onChangeInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          textLabel="number"
        />
      </div>
      <Button />
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setIsVisibleModal: PropTypes.func.isRequired,
  checkContactForRepetition: PropTypes.func.isRequired,
};

export default Form;
