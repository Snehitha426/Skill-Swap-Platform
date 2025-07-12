import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles.css";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const filteredUsers = users.filter((u) => {
    const skillMatch =
      u.skillsOffered?.some((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      ) ||
      u.skillsWanted?.some((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      );

    const availabilityMatch = availabilityFilter
      ? u.availability?.toLowerCase().includes(
          availabilityFilter.toLowerCase()
        )
      : true;

    return skillMatch && availabilityMatch;
  });

  return (
    <div className="home-container">
      <h1>Skill Swap Platform</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Availability (e.g. weekends)"
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
        />
      </div>

      <div className="card-grid">
        {filteredUsers.map((user, index) => (
          <div key={index} className="user-card">
            <h3>{user.name}</h3>
            <p className="light">Location: {user.location || "N/A"}</p>
            <p className="light">
              Availability: {user.availability || "—"}
            </p>
            <p>
              <strong>Skills Offered:</strong>{" "}
              {user.skillsOffered.join(", ")}
            </p>
            <p>
              <strong>Skills Wanted:</strong>{" "}
              {user.skillsWanted.join(", ")}
            </p>

            <Link to={`/user/${user.name}`}>
              <button className="btn-request">View & Request</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
