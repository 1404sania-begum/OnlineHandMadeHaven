// src/pages/Cart.js
import React, { useState, useEffect } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Function to handle the addition/removal of items from the cart
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleRemoveItem = (itemToRemove) => {
    const updatedCart = cartItems.filter(item => item.id !== itemToRemove.id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout!");
    // Implement checkout logic here
  };

  return (
    <div className="custom-cart-container">
  <h2 className="custom-cart-title">Your Cart</h2>
  {cartItems.length === 0 ? (
    <p className="custom-empty-message">Your cart is empty.</p>
  ) : (
    <div className="custom-cart-items">
      {cartItems.map((item) => (
        <div key={item.id} className="custom-cart-item">
          <h4>{item.name}</h4>
          <p>Price: ${item.price}</p>
          <span className="custom-remove-btn" onClick={() => handleRemoveItem(item)}>❌</span>
        </div>
      ))}
      <div className="custom-checkout-btn" onClick={handleCheckout}>Proceed to Checkout</div>
    </div>
  )}
</div>

  );
}

export default Cart;
