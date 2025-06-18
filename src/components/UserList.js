import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await axios.get('http://localhost:8080/api/users');
    setUsers(res.data);
  };

  const createUser = async () => {
    if (!form.name || !form.email) return alert("Both fields required");
    await axios.post('http://localhost:8080/api/users', form);
    setForm({ name: '', email: '' });
    loadUsers();
  };
  
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/api/users/${id}`);
    loadUsers();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Manager</h2>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <button onClick={createUser}>Add User</button>

      <ul>
      {users.map((u) => (
        <li key={u.id}>
            {u.name} ({u.email}) <button onClick={() => deleteUser(u.id)}>❌</button>
        </li>
        ))}

      </ul>
    </div>
  );
};

export default UserList;
