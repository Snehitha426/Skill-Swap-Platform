<div className="swap-form-container">
  <h3 className="swap-title">Send Swap Request</h3>

  <select
    value={offered}
    onChange={(e) => setOffered(e.target.value)}
    className="swap-input"
  >
    <option value="">Select your offered skill</option>
    {user.skillsWanted.map((skill, i) => (
      <option key={i} value={skill}>{skill}</option>
    ))}
  </select>

  <select
    value={wanted}
    onChange={(e) => setWanted(e.target.value)}
    className="swap-input"
  >
    <option value="">Select their skill you want</option>
    {user.skillsOffered.map((skill, i) => (
      <option key={i} value={skill}>{skill}</option>
    ))}
  </select>

  <textarea
    rows="3"
    placeholder="Message (optional)"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className="swap-textarea"
  />

  <button className="swap-submit-btn" onClick={handleSubmit}>Submit</button>

  {statusMsg && (
    <div className={`swap-status ${statusMsg.includes("✅") ? "success" : "error"}`}>
      {statusMsg}
    </div>
  )}
</div>
