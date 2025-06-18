import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  // ✅ Live backend URL from Render
  const baseUrl = "https://user-management-backend-82nt.onrender.com/api/users";

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get(baseUrl);
      setUsers(res.data);
    } catch (err) {
      alert("Failed to fetch users: " + err.message);
    }
  };

  const createUser = async () => {
    if (!form.name || !form.email) return alert("Both fields are required");
    try {
      await axios.post(baseUrl, form);
      setForm({ name: '', email: '' });
      loadUsers();
    } catch (err) {
      alert("Failed to create user: " + err.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      loadUsers();
    } catch (err) {
      alert("Failed to delete user: " + err.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>User Manager</h2>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <button onClick={createUser} style={{ marginBottom: '20px' }}>
        Add User
      </button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email}){" "}
            <button onClick={() => deleteUser(u.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
