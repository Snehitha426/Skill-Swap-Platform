import React from "react";
import "../styles/UserProfile.css";

export default function UserProfile({ user }) {
  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="nav-links">
          <button className="save-btn">Save</button>
          <button className="discard-btn">Discard</button>
        </div>
        <div className="nav-right">
          <button>Swap Request</button>
          <button>Home</button>
          <img className="profile-pic" src="/user.png" alt="User" />
        </div>
      </header>

      <div className="profile-body">
        <div className="profile-fields">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Skills Offered:</strong> {user.skillsOffered.join(", ")}</p>
          <p><strong>Skills Wanted:</strong> {user.skillsWanted.join(", ")}</p>
          <p><strong>Availability:</strong> {user.availability}</p>
          <p><strong>Profile:</strong> {user.isPublic ? "Public" : "Private"}</p>
        </div>
        <div className="profile-photo">
          <img src="/user.png" alt="Profile" />
        </div>
      </div>
    </div>
  );
}
