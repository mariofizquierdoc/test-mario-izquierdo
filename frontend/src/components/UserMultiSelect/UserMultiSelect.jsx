import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

function UserMultiSelect({ value = [], onChange, name = "userIds" }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.getAllUsers();
      setUsers(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    // Create a synthetic event that matches the structure expected by form handlers
    onChange({
      target: {
        name: name,
        value: selectedOptions
      }
    });
  };

  if (loading) {
    return (
      <select 
        multiple
        disabled 
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 h-32"
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

  return (
    <div>
      <select
        id={name}
        name={name}
        multiple
        value={value}
        onChange={handleSelectChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.firstName} {user.lastName} - {user.email}
          </option>
        ))}
      </select>
      <p className="text-sm text-gray-500 mt-2">
        Hold Ctrl (Windows) or Cmd (Mac) to select multiple users
      </p>
    </div>
  );
}

export default UserMultiSelect;