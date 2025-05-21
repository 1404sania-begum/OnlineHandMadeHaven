import React, { useState } from "react";
import { register } from "../api"; // This should POST to your Laravel backend

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordHint, setPasswordHint] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, phoneNumber, password, confirmPassword } = formData;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    if (!passwordPattern.test(password)) {
      alert(
        "❌ Password must contain 8+ characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    try {
      // Register the user
      const response = await register({
        name,
        email,
        phone_number: phoneNumber,
        password,
        password_confirmation: confirmPassword,
      });

      // Save token
      localStorage.setItem("token", response.token);

      // Fetch user info right after signup
      const userRes = await fetch("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${response.token}`,
        },
      });

      const userData = await userRes.json();

      console.log("Fetched user data:", userData); // 👀 check structure

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("username", userData.user?.name || "Guest");
      localStorage.setItem("role", userData.user?.role || "user");

      alert("✅ Signup successful!");
      window.location.href = "/";
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert("❌ Signup failed! Check your input.");
    }
  };

  return (
    <div className="register-container">
      <h2>User Registration:</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onFocus={() => setPasswordHint(true)}
            onBlur={() => setPasswordHint(false)}
            placeholder="Enter your password"
            required
          />
          {passwordHint && (
            <p className="password-hint">
              ⚠ Password must be at least 8 characters long and include at least
              one uppercase letter, one lowercase letter, one digit, and one
              special character (@!#%$^&*).
            </p>
          )}
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login Here</a>
      </p>

    </div>
  );
}

export default Register;
