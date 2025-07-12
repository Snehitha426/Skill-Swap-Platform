import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
const [email, setEmail] = useState("");
const navigate = useNavigate();

const handleLogin = (e) => {
e.preventDefault();
localStorage.setItem("user", email);
navigate("/");
};

return (
<div className="flex flex-col items-center justify-center h-screen text-white bg-black">
<h2 className="text-2xl mb-4">Login</h2>
<form onSubmit={handleLogin} className="flex flex-col gap-3 w-72">
<input className="p-2 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
<input className="p-2 border rounded" type="password" placeholder="Password" />
<button type="submit" className="bg-blue-500 p-2 rounded text-white">Login</button>
</form>
</div>
);
}