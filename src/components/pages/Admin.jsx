import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  const banUser = async (name) => {
    await axios.put(`http://localhost:5000/api/users/ban/${name}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      {users.map((user, index) => (
        <div key={index} className="card">
          <p>
            {user.name} - {user.banned ? "BANNED" : "ACTIVE"}
          </p>
          <button onClick={() => banUser(user.name)}>Ban</button>
        </div>
      ))}
    </div>
  );
}
