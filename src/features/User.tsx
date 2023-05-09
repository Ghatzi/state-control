import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users } from '../types/index';

interface Props {
  users: Users[];
}

const User = ({ users }: Props) => {
  const { id } = useParams();
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editUsername, setEditUsername] = useState('');

  const findUser = users.find(user => user.id.toString() === id);

  useEffect(() => {
    if (findUser) {
      setEditFirstName(findUser.firstName);
      setEditLastName(findUser.lastName);
      setEditUsername(findUser.username);
    }
  }, [findUser, setEditFirstName, setEditLastName, setEditUsername]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateUser = {
      username: editUsername,
      firstName: editFirstName,
      lastName: editLastName,
      updatedDate: format(new Date(), 'MMMM dd, yyyy pp')
    };

    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateUser)
    };

    try {
      await fetch(`http://localhost:5000/users/${id}`, updateOptions);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="firstName"
        value={editFirstName}
        onChange={e => setEditFirstName(e.target.value)}
      />

      <input
        type="text"
        id="lastName"
        value={editLastName}
        onChange={e => setEditLastName(e.target.value)}
      />

      <input
        type="text"
        id="username"
        value={editUsername}
        onChange={e => setEditUsername(e.target.value)}
      />

      <button>update</button>
    </form>
  );
};

export default User;
