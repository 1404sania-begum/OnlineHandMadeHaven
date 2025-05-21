import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AdminLogin.css';  // Import the CSS file for styling

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Default admin credentials
    const defaultUsername = "admin";
    const defaultPassword = "admin123";

    // Check if the entered credentials match the default ones
    if (username === defaultUsername && password === defaultPassword) {
      // Redirect to admin dashboard
      navigate("/admin-dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
      setUsername(""); // Clear the username field after invalid login
      setPassword(""); // Clear the password field after invalid login
    }
  };

  return (
    <div className="login-container1">
      <form onSubmit={handleLogin}>
      <h2 className="adm">Admin Login :</h2>
        <div className="form-group1">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="form-group1">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
