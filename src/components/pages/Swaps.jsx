import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Swaps() {
  const user = localStorage.getItem("user");
  const [swaps, setSwaps] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) return;
    axios.get("http://localhost:5000/api/swaps").then((res) => {
      const mySwaps = res.data.filter(
        (swap) => swap.toUser === user || swap.fromUser === user
      );
      setSwaps(mySwaps);
    });
  }, [user]);

  const handleStatusChange = (id, newStatus) => {
    axios
      .patch(`http://localhost:5000/api/swaps/${id}`, { status: newStatus })
      .then(() => {
        setSwaps((prev) =>
          prev.map((s) => (s._id === id ? { ...s, status: newStatus } : s))
        );
      });
  };

  const filtered = swaps.filter((s) => {
    const nameMatch = s.fromUser.toLowerCase().includes(search.toLowerCase()) || s.toUser.toLowerCase().includes(search.toLowerCase());
    const statusMatch = statusFilter === "All" || s.status === statusFilter;
    return nameMatch && statusMatch;
  });

  return (
    <div className="p-6 text-white min-h-screen bg-black">
      <h2 className="text-2xl font-bold mb-4 text-center">My Swap Requests</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded text-black w-full sm:w-64"
        />
      </div>

      {/* Swap Cards */}
      <div className="flex flex-col gap-4">
        {filtered.map((swap) => (
          <div
            key={swap._id}
            className="border border-gray-700 p-4 rounded-lg flex flex-col sm:flex-row justify-between bg-[#111]"
          >
            <div>
              <h3 className="text-lg font-semibold">{swap.fromUser}</h3>
              <p>
                <strong className="text-green-400">Skill Offered:</strong>{" "}
                {swap.skillOffered}
              </p>
              <p>
                <strong className="text-blue-400">Skill Requested:</strong>{" "}
                {swap.skillRequested}
              </p>
              <p className="text-sm text-gray-400">Rating: 3.9/5</p>
            </div>

            <div className="flex flex-col gap-1 items-end mt-2 sm:mt-0">
              <p className="text-sm">Status: {swap.status}</p>
              {swap.status === "pending" && swap.toUser === user && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(swap._id, "accepted")}
                    className="text-green-500 hover:underline"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(swap._id, "rejected")}
                    className="text-red-500 hover:underline"
                  >
                    Reject
                  </button>
                </div>
              )}
              {swap.status === "accepted" && (
                <span className="text-green-400">✅ Accepted</span>
              )}
              {swap.status === "rejected" && (
                <span className="text-red-400">❌ Rejected</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination (UI Only for now) */}
      <div className="flex justify-center mt-6 text-white gap-2">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            className="border px-2 py-1 rounded hover:bg-gray-700"
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
