import { useState, useEffect } from 'react';
import api from '../../utils/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/users');
      setUsers(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading realm inhabitants...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">User Management (Admin)</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-xs leading-normal">
              <th className="py-3 px-6 text-left border-b">ID</th>
              <th className="py-3 px-6 text-left border-b">Username</th>
              <th className="py-3 px-6 text-left border-b">Email</th>
              <th className="py-3 px-6 text-left border-b">Role</th>
              <th className="py-3 px-6 text-center border-b">Status</th>
              <th className="py-3 px-6 text-center border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map(user => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left border-b whitespace-nowrap">{user.id}</td>
                <td className="py-3 px-6 text-left border-b">{user.username}</td>
                <td className="py-3 px-6 text-left border-b">{user.email}</td>
                <td className="py-3 px-6 text-left border-b uppercase font-bold">{user.role}</td>
                <td className="py-3 px-6 text-center border-b">
                  <span className={`${user.is_active ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'} py-1 px-3 rounded-full text-xs`}>
                    {user.is_active ? 'Active' : 'Banned'}
                  </span>
                </td>
                <td className="py-3 px-6 text-center border-b">
                  <div className="flex item-center justify-center gap-2">
                    <button className="text-blue-500 hover:text-blue-700">Edit</button>
                    <button className="text-red-500 hover:text-red-700">Toggle Access</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
