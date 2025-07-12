import React, { useState } from "react";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    skillsOffered: "",
    skillsWanted: "",
    availability: "",
    isPublic: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...profile,
      skillsOffered: profile.skillsOffered.split(",").map(s => s.trim()),
      skillsWanted: profile.skillsWanted.split(",").map(s => s.trim())
    };

    try {
      await axios.post("http://localhost:5000/api/users", payload);
      alert("Profile saved successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save profile.");
    }
  };

  return (
    <div className="container">
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={profile.location}
          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Skills Offered (comma separated)"
          value={profile.skillsOffered}
          onChange={(e) =>
            setProfile({ ...profile, skillsOffered: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Skills Wanted (comma separated)"
          value={profile.skillsWanted}
          onChange={(e) =>
            setProfile({ ...profile, skillsWanted: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Availability (e.g., weekends)"
          value={profile.availability}
          onChange={(e) =>
            setProfile({ ...profile, availability: e.target.value })
          }
        />
        <label>
          Public Profile:
          <input
            type="checkbox"
            checked={profile.isPublic}
            onChange={(e) =>
              setProfile({ ...profile, isPublic: e.target.checked })
            }
          />
        </label>
        <br />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}
