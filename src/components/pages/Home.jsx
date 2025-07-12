import React, { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(data);
  }, []);

  const filtered = users.filter((u) =>
    u.skillsOffered?.some((s) =>
      s.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="container">
      <h2>Browse Users by Skill</h2>
      <input
        type="text"
        placeholder="Search skill..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {filtered.map((user, i) => (
          <div key={i} className="card">
            <h3>{user.name}</h3>
            <p>Skills Offered: {user.skillsOffered.join(", ")}</p>
            <p>Skills Wanted: {user.skillsWanted.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
