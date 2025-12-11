import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';

function UserSelect({ value, onChange, name = "userId", required = false, disabled = false }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { projectId } = useParams();
  const { user } = useAuth();
  const disabledAttr = disabled ? 'disabled=disabled' : '';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      let data = {"users": [user]};
      if (projectId) {
        data = await api.getProjectCollabUsers(projectId);
      }
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <select 
        disabled 
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
      >
        <option>Loading users...</option>
      </select>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-sm">
        {error}
      </div>
    );
  }

  if (! disabled) {
    return (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.firstName} {user.lastName} - &lt;{user.email}&gt;
          </option>
        ))}
      </select>
    );
  } else {
    return (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled="disabled"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.firstName} {user.lastName} - &lt;{user.email}&gt;
          </option>
        ))}
      </select>
    );
  }
}

export default UserSelect;