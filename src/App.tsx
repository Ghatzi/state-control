import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddUser from './features/AddUser';
import User from './features/User';
import UsersList from './features/UsersList';
import { Users } from './types/index';

const App = () => {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="users">
          <Route
            index
            element={<UsersList users={users} setUsers={setUsers} />}
          />
          <Route path=":id">
            <Route index element={<User users={users} />} />
          </Route>
        </Route>
      </Route>
      <Route
        path="addUser"
        index
        element={
          <AddUser
            userCount={users.length ? users[users.length - 1].id + 1 : 1}
          />
        }
      />
    </Routes>
  );
};

export default App;
