import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const user = localStorage.getItem("user");
  const [form, setForm] = useState({
    name: user || "",
    location: "",
    skillsOffered: [],
    skillsWanted: [],
    availability: "",
    isPublic: true,
  });
  const [editing, setEditing] = useState(false);

  // Load profile if exists
  useEffect(() => {
    if (!user) return;
    axios.get("http://localhost:5000/api/users").then((res) => {
      const found = res.data.find((u) => u.name === user);
      if (found) setForm(found);
    });
  }, [user]);

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5000/api/users", form);
      alert("✅ Profile saved!");
      setEditing(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Failed to save profile.");
    }
  };

  const handleDiscard = () => {
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white bg-black min-h-screen rounded-lg border border-gray-700">
      {/* Navigation (Top Right) */}
      <div className="flex justify-between items-center mb-6">
        <div>
          {editing ? (
            <div className="flex gap-4 text-sm">
              <button
                onClick={handleSave}
                className="text-green-400 hover:underline"
              >
                Save
              </button>
              <button
                onClick={handleDiscard}
                className="text-red-400 hover:underline"
              >
                Discard
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="text-blue-400 hover:underline text-sm"
            >
              Edit Profile
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <a href="/swaps" className="hover:underline">Swap Requests</a>
          <a href="/" className="hover:underline">Home</a>
          <img
            src={`https://ui-avatars.com/api/?name=${user}`}
            alt="Profile"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>

      {/* Profile Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Name</label>
            <input
              disabled
              value={form.name}
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-semibold">Location</label>
            <input
              disabled={!editing}
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-semibold">Skills Offered</label>
            <input
              disabled={!editing}
              value={form.skillsOffered.join(", ")}
              onChange={(e) =>
                setForm({
                  ...form,
                  skillsOffered: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-semibold">Availability</label>
            <input
              disabled={!editing}
              value={form.availability}
              onChange={(e) =>
                setForm({ ...form, availability: e.target.value })
              }
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="text-center">
            <img
              src={`https://ui-avatars.com/api/?name=${user}&background=random`}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto border"
            />
            <p className="text-sm mt-1 text-gray-400">Profile Photo</p>
          </div>
          <div>
            <label className="block font-semibold">Skills Wanted</label>
            <input
              disabled={!editing}
              value={form.skillsWanted.join(", ")}
              onChange={(e) =>
                setForm({
                  ...form,
                  skillsWanted: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-semibold">Profile</label>
            <select
              disabled={!editing}
              value={form.isPublic ? "Public" : "Private"}
              onChange={(e) =>
                setForm({ ...form, isPublic: e.target.value === "Public" })
              }
              className="bg-gray-800 text-white p-2 rounded w-full"
            >
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
