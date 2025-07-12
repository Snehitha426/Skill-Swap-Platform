import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Swaps() {
  const [swaps, setSwaps] = useState([]);
  const [form, setForm] = useState({
    fromUser: "",
    toUser: "",
    skillRequested: "",
    skillOffered: "",
  });

  const loadSwaps = async () => {
    const res = await axios.get("http://localhost:5000/api/swaps");
    setSwaps(res.data);
  };

  useEffect(() => {
    loadSwaps();
  }, []);

  const handleSendSwap = async () => {
    try {
      await axios.post("http://localhost:5000/api/swaps", form);
      alert("Swap sent!");
      setForm({
        fromUser: "",
        toUser: "",
        skillRequested: "",
        skillOffered: "",
      });
      loadSwaps();
    } catch (err) {
      console.error("Swap creation failed", err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/swaps/${id}`, { status });
    loadSwaps();
  };

  return (
    <div className="container">
      <h2>Swap Center</h2>

      <input
        type="text"
        placeholder="Your Name"
        value={form.fromUser}
        onChange={(e) => setForm({ ...form, fromUser: e.target.value })}
      />
      <input
        type="text"
        placeholder="To User"
        value={form.toUser}
        onChange={(e) => setForm({ ...form, toUser: e.target.value })}
      />
      <input
        type="text"
        placeholder="Skill Requested"
        value={form.skillRequested}
        onChange={(e) => setForm({ ...form, skillRequested: e.target.value })}
      />
      <input
        type="text"
        placeholder="Skill Offered"
        value={form.skillOffered}
        onChange={(e) => setForm({ ...form, skillOffered: e.target.value })}
      />
      <button onClick={handleSendSwap}>Send Swap</button>

      <hr />
      <h3>Swap Requests</h3>
      {swaps.map((swap) => (
        <div key={swap._id} className="card">
          <p>
            From: {swap.fromUser} → To: {swap.toUser}
          </p>
          <p>
            {swap.skillOffered} in exchange for {swap.skillRequested}
          </p>
          <p>Status: {swap.status}</p>
          {swap.status === "pending" && (
            <>
              <button onClick={() => handleUpdateStatus(swap._id, "accepted")}>
                Accept
              </button>
              <button onClick={() => handleUpdateStatus(swap._id, "rejected")}>
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
