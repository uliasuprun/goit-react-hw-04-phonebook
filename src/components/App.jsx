import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { MainWrapper, HeaderPhone, HeaderContacts } from './App.styled';
import ContactForm from './Phonebook/Phonebook';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addFormContact = data => {
    const newContact = { id: nanoid(), ...data };
    const newName = newContact.name;

    const proofName = Object.values(contacts).map(contact =>
      contact.name.toLowerCase()
    );
    if (proofName.includes(newName)) {
      return alert(`${newName} is already in contacts.`);
    }

    setContacts(contacts => [newContact, ...contacts]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onDeleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <MainWrapper>
      <HeaderPhone>Phonebook</HeaderPhone>
      <ContactForm onSubmit={addFormContact} />

      <HeaderContacts>Contacts</HeaderContacts>
      <Filter filter={filter} onChange={changeFilter} />

      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={onDeleteContact}
      />
    </MainWrapper>
  );
};

export default App;
