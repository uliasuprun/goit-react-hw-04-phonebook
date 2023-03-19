import { useState } from 'react';
import { Form, Label, Input, Button } from './Phonebook.styled';
import PropTypes from 'prop-types';

const Phonebook = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleFormChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return console.warn(`Type field ${name} don't read `);
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleFormChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={handleFormChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    </>
  );
};

Phonebook.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }),
  handleFormChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
};

export default Phonebook;
