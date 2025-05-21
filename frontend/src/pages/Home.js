import React from "react";
import Products from "../components/ProductList"; // Import the Products component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';  // Example Icon

const Home = () => {
  return (
    <div className="home">
      <h1 className="welcome-heading">
        <FontAwesomeIcon icon={faSmile} style={{ marginRight: '10px' }} />
        Welcome to Our Online Handmade Haven ✨
      </h1>

      <Products /> {/* Display the products */}
    </div>
  );
};

export default Home;
