import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username"); // Laravel se aaya name
  const role = localStorage.getItem("role"); // Optional: admin ya user

  // Get cart items
  let cartItems = [];
  try {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      cartItems = JSON.parse(storedCartItems);
      if (!Array.isArray(cartItems)) cartItems = [];
    }
  } catch (e) {
    console.error("Error parsing cartItems from localStorage", e);
  }

  const isAdmin = role === "admin"; // Admin check
  const displayName = username ? username.charAt(0).toUpperCase() + username.slice(1) : "User";

  return (
    <nav className="navbar">
      <ul className="navbar-list">

        {/* Home */}
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <FontAwesomeIcon icon={faHome} className="nav-icon" /> Home
          </Link>
        </li>

        {/* Cart */}
        <li className="nav-item">
          <Link to="/cart" className="nav-link">
            <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" /> Cart
            {cartItems.length > 0 && (
              <span className="cart-count">({cartItems.length})</span>
            )}
          </Link>
        </li>

        {/* Guest Links */}
        {!token && (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                <FontAwesomeIcon icon={faSignInAlt} className="nav-icon" /> Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin-login" className="nav-link">
                <FontAwesomeIcon icon={faUser} className="nav-icon" /> Admin
              </Link>
            </li>
          </>
        )}

        {/* Normal User Section */}
        {token && !isAdmin && (
          <>
            <li className="nav-item hello-user">
              <span className="nav-link" title={`Logged in as ${displayName}`}>
                <FontAwesomeIcon icon={faUser} className="nav-icon" /> Hello👋, {displayName}
              </span>
            </li>
            <li className="nav-item">
              <button
                className="logout-btn"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("cartItems");
                  localStorage.removeItem("username");
                  localStorage.removeItem("role");
                  window.location.reload();
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> Logout
              </button>
            </li>
          </>
        )}

        {/* Admin Section */}
        {token && isAdmin && (
          <>
            <li className="nav-item">
              <span className="nav-link" title={`Logged in as Admin`}>
                <FontAwesomeIcon icon={faUser} className="nav-icon" /> Admin
              </span>
            </li>
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link">
                Admin Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="logout-btn"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("username");
                  localStorage.removeItem("role");
                  localStorage.removeItem("cartItems");
                  window.location.reload();
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
