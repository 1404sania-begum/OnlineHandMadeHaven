import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ onClose, totalAmount, onPaymentSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [showQR, setShowQR] = useState(false);
  const [txnId, setTxnId] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePay = () => {
    const { name, email, phone, address, city, state, zip } = formData;

    if (!name || !email || !phone || !address || !city || !state || !zip) {
      alert("⚠️ Please fill in all fields before proceeding.");
      return;
    }

    const newTxnId = `TXN${Date.now()}`;
    setTxnId(newTxnId);
    setShowQR(true);
  };

  const handleMockPayment = () => {
    const synth = window.speechSynthesis;
    const message = new SpeechSynthesisUtterance(
      `Payment successful of rupees ${totalAmount}`
    );

    message.onend = () => {
      alert("✅ Payment Successful");

      const orderData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        amount: totalAmount,
        txnId,
        date: new Date().toLocaleString(),
        feedback: "",
        rating: ""
      };

      // Store in individual 'orderDetails' (for confirmation page)
      localStorage.setItem("orderDetails", JSON.stringify(orderData));

      // Append to allOrders array for admin dashboard
      const existingOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
      existingOrders.push(orderData);
      localStorage.setItem("allOrders", JSON.stringify(existingOrders));


      if (onPaymentSuccess) {
        onPaymentSuccess(); // 🆕 Clear cart
      }

      onClose(); // Close modal
      navigate("/order-confirmation"); // Redirect
    };

    synth.speak(message);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>🧾 Payment Page</h2>

        {!showQR ? (
          <>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} style={inputStyle} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={inputStyle} />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} style={inputStyle} />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} style={inputStyle} />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} style={inputStyle} />
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} style={inputStyle} />
            <input type="text" name="zip" placeholder="ZIP / PIN Code" value={formData.zip} onChange={handleChange} style={inputStyle} />

            <h3>Total to Pay: ₹{totalAmount}</h3>

            <div style={{ marginTop: "15px", display: "flex", justifyContent: "center", gap: "10px" }}>
              <button onClick={handlePay} style={payBtnStyle}>Pay Now</button>
              <button onClick={onClose} style={closeBtnStyle}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <p>Scan QR or use UPI ID to pay</p>

            <QRCodeCanvas
              value={`upi://pay?pa=yourupi@okaxis&tn=${txnId}&am=${totalAmount}`} // your upi id 
              size={200}
              includeMargin={true}
            />
            
            {/* your upi id */}
            <p>or UPI ID: <strong>yourupi@okaxis</strong></p>

            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <button onClick={handleMockPayment} style={payBtnStyle}>
                ✅ Simulate Payment Success
              </button>
              <button onClick={onClose} style={closeBtnStyle}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Styles (unchanged)
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "450px",
  textAlign: "center",
  boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const payBtnStyle = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  marginRight: "10px",
  cursor: "pointer",
};

const closeBtnStyle = {
  padding: "10px 20px",
  backgroundColor: "#ccc",
  color: "#333",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default PaymentModal;
