import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UserDashboard from "./pages/UserDashboard"; 
import OrderDashboard from './pages/OrderDashboard'; // Corrected import
import OrderConfirmation from './components/OrderConfirmation';

// Importing Pages
import Navbar from './components/Navbar';
import Home from './pages/Home'; // Home Page
import Login from './pages/Login'; // Login Page
import Register from './pages/Register'; // Register Page
import AdminLogin from './pages/AdminLogin'; // Admin Login Page
import AdminDashboard from './pages/AdminDashboard'; // Admin Dashboard Page
import Cart from './components/Cart'; // ✅ Use this one

function App() {

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar />

        <Routes>
          {/* Define Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} /> {/* Admin login page */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Admin dashboard */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/order-dashboard" element={<OrderDashboard />} /> {/* Correct usage of element prop */}
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
