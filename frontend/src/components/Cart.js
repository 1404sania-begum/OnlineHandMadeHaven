import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import PaymentModal from "./PaymentModal";
import "../CartStyles.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty 😢</p>
      ) : (
        <div className="cart-wrapper">
          <table className="cart-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Remove</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td
                    className="cart-delete-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    <FaTrashAlt />
                  </td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3 className="cart-total">Total: ₹{calculateTotal()}</h3>
            <div
              className="cart-checkout-btn"
              onClick={() => {
                const token = localStorage.getItem("token");
                if (!token) {
                  alert("⚠️ Please login or sign up before making a payment.");
                  window.location.href = "/login";
                  return;
                }
                setShowPayment(true);
              }}
              style={{ cursor: "pointer" }}
            >
              Proceed to Checkout →
            </div>
          </div>
        </div>
      )}
      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          totalAmount={calculateTotal()}
          onPaymentSuccess={clearCart} // 🆕 cart clear after success
        />
      )}
    </div>
  );
};

export default Cart;
