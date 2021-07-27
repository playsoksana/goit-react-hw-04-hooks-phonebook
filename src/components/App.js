import { useState, useMemo, useEffect } from 'react';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import Container from './Container/Container';
import ButtonIcon from './Button/ButtonIcon';
import Modal from './Modal/Modal';
import { ToastContainer } from 'react-toastify';
import { ReactComponent as AddIcon } from '../icon/plus.svg';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../helpers/notify';
import '../index.css';
import { getLocal, setLocal } from '../helpers/localStorage';
import CONTACTS from '../contacts.json';

const App = () => {
  const [contacts, setContacts] = useState([...CONTACTS]);
  const [filter, setFilter] = useState('');
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('contacts')) {
      setContacts(getLocal());
    }
  }, []);

  useEffect(() => {
    setLocal(contacts);
  }, [contacts, isVisibleModal]);

  function checkContactForRepetition(userName) {
    if (
      contacts.find(user => user.name.toLowerCase() === userName.toLowerCase())
    ) {
      notify(userName);
      return true;
    }
    return false;
  }

  const addContactOnSubmit = data => {
    const { name, number, id } = data;
    const contact = {
      name,
      number,
      id,
    };

    setContacts(s => {
      return [contact, ...s];
    });
  };

  const filterOnRender = useMemo(() => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [contacts, filter]);

  const onChangeInputFilter = ({ currentTarget: { value } }) => {
    setFilter(value);
  };

  const deleteContact = idContact => {
    setContacts(s => s.filter(({ id }) => id !== idContact));
  };

  const toggleIsVisible = () => {
    setIsVisibleModal(s => {
      return !s;
    });
  };

  return (
    <section>
      <h1>Phonebook</h1>

      <ButtonIcon
        toggleIsVisible={toggleIsVisible}
        aria="add contact"
        classButton="Icon"
      >
        <AddIcon width="40px" height="40px" />
      </ButtonIcon>

      <Container>
        <Filter
          value={filter}
          filterContacts={onChangeInputFilter}
          contacts={contacts}
        />
      </Container>

      <Container>
        <ContactList
          contactsRender={filterOnRender}
          deleteContactOnClick={deleteContact}
          contacts={contacts}
        />
      </Container>

      <ToastContainer />

      <Modal toggleIsVisible={toggleIsVisible} isVisibleModal={isVisibleModal}>
        <Form
          onSubmit={addContactOnSubmit}
          setIsVisibleModal={setIsVisibleModal}
          checkContactForRepetition={checkContactForRepetition}
        />
      </Modal>
    </section>
  );
};

export default App;
