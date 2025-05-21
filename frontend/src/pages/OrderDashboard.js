import React, { useState, useEffect } from "react";

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    setOrders(storedOrders);
    setTotalOrders(storedOrders.length);
  }, []);

  const handleDeleteOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
    setTotalOrders(updatedOrders.length);
    localStorage.setItem("allOrders", JSON.stringify(updatedOrders));
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.mainContent}>
        <h2 style={styles.title}>📦 Order Management</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Order Date</th>
                <th style={styles.th}>Address</th>
                <th style={styles.th}>Amount Paid</th>
                <th style={styles.th}>Txn ID</th>
                <th style={styles.th}>Feedback</th>
                <th style={styles.th}>Rating</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={index} style={styles.tr}>
                    <td style={styles.td}>{index + 1}</td>
                    <td style={styles.td}>{order.name || order.fullName}</td>
                    <td style={styles.td}>{order.date}</td>
                    <td style={styles.td}>
                      {order.address}, {order.city}, {order.state} - {order.zip}
                    </td>
                    <td style={styles.td}>₹{order.amount}</td>
                    <td style={styles.td}>{order.txnId}</td>
                    <td style={styles.td}>{order.feedback || "—"}</td>
                    <td style={styles.td}>{order.rating || "—"}</td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handleDeleteOrder(index)}
                        style={styles.iconBtn}
                        title="Delete Order"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={styles.noData}>
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p style={styles.totalOrders}>Total Orders: {totalOrders}</p>
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  mainContent: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "1400px",
  },
  title: {
    color: "#333",
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "24px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
    backgroundColor: "#fff",
  },
  th: {
    padding: "14px",
    textAlign: "left",
    backgroundColor: "#f3f4f6",
    fontWeight: "600",
    color: "#333",
    fontSize:"18px",
    borderBottom: "1px solid #ddd",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "14px",
    borderBottom: "1px solid #eee",
    verticalAlign: "top",
    fontSize:"14.5px",
  },
  tr: {
    transition: "background-color 0.2s ease-in-out",
  },
  iconBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#e74c3c",
    transition: "transform 0.2s ease",
  },
  iconBtnHover: {
    transform: "scale(1.2)",
  },
  noData: {
    textAlign: "center",
    fontSize: "16px",
    padding: "20px",
    color: "#777",
  },
  totalOrders: {
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "650",
    marginTop: "10px",
    color: "#444",
  },
};

export default OrderDashboard;
