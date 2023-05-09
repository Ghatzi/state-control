import { format } from 'date-fns';
import { useState } from 'react';

interface Props {
  userCount: number;
}

const AddUser = ({ userCount }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedDate = format(new Date(), 'MMMM dd, yyyy pp');

    const newUser = {
      id: userCount,
      username,
      password,
      firstName,
      lastName,
      isAdmin: false,
      createdDate: formattedDate,
      updatedDate: formattedDate
    };

    const addOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    };

    try {
      await fetch('http://localhost:5000/users', addOptions);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />

      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />

      <button>Add New</button>
    </form>
  );
};

export default AddUser;
