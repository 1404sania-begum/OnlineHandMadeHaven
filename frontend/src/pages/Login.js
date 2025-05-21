// import React, { useState } from "react";
// import { login } from "../api"; // ✅ Correct API import
// import "../App.css"; 

// function Login() {
//   const [email, setEmail] = useState("");  // ✅ Email field use kiya (not name)
//   const [password, setPassword] = useState("");
//   const [passwordHint, setPasswordHint] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await login({ email, password }); // ✅ Correct API call
//       localStorage.setItem("token", data.token);
//       alert("✅ Login successful!");
//     } catch (error) {
//       console.error("❌ Login Error:", error.response?.data || error);
//       alert("❌ Login failed! Please check your email and password.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>User Login :</h2>
//       <form onSubmit={handleLogin}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             onFocus={() => setPasswordHint(true)}
//             onBlur={() => setPasswordHint(false)}
//             placeholder="Enter your password"
//             required
//           />
//           {passwordHint && (
//             <p className="password-hint">
//               ⚠ Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (@!#%$^&*).
//             </p>
//           )}
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account? <a href="/register">Sign Up</a>
//       </p>
//     </div>
//   );
// }

// export default Login;




import React, { useState } from "react";
import { login } from "../api";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHint, setPasswordHint] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      console.log("✅ Login Response:", response);
      localStorage.setItem("token", response.token);


      localStorage.setItem("username", response.user.name); 

      alert("✅ Login successful!");
      window.location.href = "/";
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("❌ Login failed! Please check your email and password.");
    }
  };

  return (
    <div className="login-container">
      <h2>User Login :</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
