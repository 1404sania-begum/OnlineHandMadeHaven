import React, { useState, useEffect } from "react";
import { placeOrder } from "../api"; // Assuming the placeOrder function is in api.js

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);

    const price = savedCart.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(price);
  }, []);

  const handlePlaceOrder = async () => {
    const orderData = {
      items: cartItems,
      total_price: totalPrice,
    };

    try {
      const response = await placeOrder(orderData, token);
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      window.location.href = "/"; // Redirect to homepage
    } catch (error) {
      alert("Failed to place order");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add items to cart to proceed.</p>
      ) : (
        <div>
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <h4>Total Price: ${totalPrice}</h4>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
