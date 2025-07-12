import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

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
    <div className="profile-container">
      {/* Top Navigation */}
      <div className="profile-header">
        <div className="actions">
          {editing ? (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleDiscard}>Discard</button>
            </>
          ) : (
            <button onClick={() => setEditing(true)}>Edit Profile</button>
          )}
        </div>
        <div className="actions">
          <a href="/swaps">Swap Requests</a>
          <a href="/">Home</a>
          <img
            src={`https://ui-avatars.com/api/?name=${user}`}
            alt="Profile"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="profile-grid">
        {/* Left Column */}
        <div>
          <div className="profile-field">
            <label>Name</label>
            <input disabled value={form.name} />
          </div>
          <div className="profile-field">
            <label>Location</label>
            <input
              disabled={!editing}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>
          <div className="profile-field">
            <label>Skills Offered</label>
            <input
              disabled={!editing}
              value={form.skillsOffered.join(", ")}
              onChange={(e) =>
                setForm({
                  ...form,
                  skillsOffered: e.target.value.split(",").map((s) => s.trim()),
                })
              }
            />
          </div>
          <div className="profile-field">
            <label>Availability</label>
            <input
              disabled={!editing}
              value={form.availability}
              onChange={(e) =>
                setForm({ ...form, availability: e.target.value })
              }
            />
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="profile-photo">
            <img
              src={`https://ui-avatars.com/api/?name=${user}&background=random`}
              alt="Profile"
            />
            <p>Profile Photo</p>
          </div>
          <div className="profile-field">
            <label>Skills Wanted</label>
            <input
              disabled={!editing}
              value={form.skillsWanted.join(", ")}
              onChange={(e) =>
                setForm({
                  ...form,
                  skillsWanted: e.target.value
                    .split(",")
                    .map((s) => s.trim()),
                })
              }
            />
          </div>
          <div className="profile-field">
            <label>Profile</label>
            <select
              disabled={!editing}
              value={form.isPublic ? "Public" : "Private"}
              onChange={(e) =>
                setForm({ ...form, isPublic: e.target.value === "Public" })
              }
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
