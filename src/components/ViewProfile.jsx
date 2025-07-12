import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function ViewProfile() {
  const { name } = useParams();
  const [user, setUser] = useState(null);
  const fromUser = localStorage.getItem("user");
  const [offered, setOffered] = useState("");
  const [wanted, setWanted] = useState("");
  const [message, setMessage] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/users").then((res) => {
      const found = res.data.find((u) => u.name === name);
      setUser(found);
    });
  }, [name]);

  const handleSubmit = () => {
    if (!fromUser) {
      setStatusMsg("❌ Please login to send a request.");
      return;
    }

    if (!offered || !wanted) {
      setStatusMsg("Please select both skills.");
      return;
    }

    axios.post("http://localhost:5000/api/swaps", {
      fromUser,
      toUser: name,
      skillRequested: wanted,
      skillOffered: offered,
      status: "pending",
    })
    .then(() => {
      setStatusMsg("✅ Request Sent!");
      setOffered(""); setWanted(""); setMessage("");
    })
    .catch(() => setStatusMsg("❌ Request Failed."));
  };

  if (!user) return <div className="container">Loading...</div>;

  return (
    <div className="profile-view">
      <h2>{user.name}'s Profile</h2>
      <p><strong>Location:</strong> {user.location}</p>
      <p><strong>Availability:</strong> {user.availability}</p>
      <p><strong>Skills Offered:</strong> {user.skillsOffered.join(", ")}</p>
      <p><strong>Skills Wanted:</strong> {user.skillsWanted.join(", ")}</p>

      <div className="swap-form">
        <h3>Send Swap Request</h3>
        <select value={offered} onChange={(e) => setOffered(e.target.value)}>
          <option value="">Choose your skill</option>
          {user.skillsWanted.map((s, i) => <option key={i}>{s}</option>)}
        </select>
        <select value={wanted} onChange={(e) => setWanted(e.target.value)}>
          <option value="">Choose skill you want</option>
          {user.skillsOffered.map((s, i) => <option key={i}>{s}</option>)}
        </select>
        <textarea placeholder="Message (optional)" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
        {statusMsg && <p>{statusMsg}</p>}
      </div>
    </div>
  );
}
