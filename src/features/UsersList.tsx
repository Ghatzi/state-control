import { faPenToSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { Users } from '../types/index';

interface Props {
  users: Users[];
  setUsers: React.Dispatch<React.SetStateAction<Users[]>>;
}

const UsersList = ({ users, setUsers }: Props) => {
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' });
      const filterDeletedUser = users.filter(user => user.id !== id);
      setUsers(filterDeletedUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="p-8 overflow-auto relative">
        <button onClick={() => navigate('/addUser')}>Add New User</button>
        <table className="table-fixed border-x border-b w-full">
          <thead className="font-bold bg-indigo-700 text-white">
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Is Admin</th>
              <th>Created Date</th>
              <th>Updated Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-center capitalize">
            {users &&
              users.map(user => (
                <tr className="hover:bg-sky-300" key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.isAdmin ? 'true' : 'false'}</td>
                  <td>{user.createdDate}</td>
                  <td>{user.updatedDate}</td>
                  <td>
                    <Link to={`/users/${user.id}`}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                  </td>
                  <td
                    className="cursor-pointer"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
