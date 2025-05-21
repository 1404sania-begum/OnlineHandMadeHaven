
import React, { useState, useEffect } from "react";
import axios from '../axios'; // ✅ custom axios instance

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  useEffect(() => {
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios.get("/api/users")
        .then((response) => {
          console.log("Fetched Users:", response.data); // ✅ Debug: See what's coming
          setUsers(response.data);
          setTotalUsers(response.data.length);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    });
  }, []);

  const handleDelete = (id) => {
    axios.get('/sanctum/csrf-cookie').then(() => {
      axios
        .delete(`/api/users/${id}`)
        .then(() => {
          const updatedUsers = users.filter((user) => user.id !== id);
          setUsers(updatedUsers);
          setTotalUsers(updatedUsers.length);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    });
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.mainContent}>
        <h2 style={styles.title}>👤User Management</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Password</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} style={styles.tr}>
                  <td style={styles.td}>{index + 1}</td> {/* Sequential ID */}
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.phone_number || 'N/A'}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>
                    <span style={styles.passwordMasked}>••••••••</span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{
                        ...styles.deleteBtn,
                        ...(hoveredBtn === user.id ? styles.deleteBtnHover : {}),
                      }}
                      onClick={() => handleDelete(user.id)}
                      onMouseEnter={() => setHoveredBtn(user.id)}
                      onMouseLeave={() => setHoveredBtn(null)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.emptyMsg}>
                  No users found 🛒
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={styles.sidebar}>
        <h3 style={styles.sidebarTitle}>Total Users</h3>
        <p style={styles.userCount}>{totalUsers}</p>
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    display: "flex",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    height: "100vh",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    marginLeft: "20px",
  },
  sidebarTitle: {
    fontSize: "21px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "orange",
  },
  userCount: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "white",
    borderRadius: "10px",
    backgroundColor: "rgb(237, 33, 33)",
    border: "1px solid red",
    padding: "10px",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "10px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "orange",
    marginBottom: "20px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "rgb(237, 33, 33)",
    color: "white",
    padding: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
  },
  passwordMasked: {
    letterSpacing: "3px",
    color: "#888",
    fontSize: "16px",
  },
  deleteBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "0.3s",
  },
  deleteBtnHover: {
    backgroundColor: "#b30000",
  },
  emptyMsg: {
    textAlign: "center",
    padding: "20px",
    color: "#777",
  },
};

export default UserDashboard;
