import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminLogin.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false); // new state for toggling orders table

  // Load products
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem("adminProducts", JSON.stringify(products));
  }, [products]);

  // Load orders
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleAddOrUpdateProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert("Please fill all fields");
      return;
    }

    const imageUrl = newProduct.image ? URL.createObjectURL(newProduct.image) : "";

    if (editProduct) {
      const updatedProducts = products.map((product) =>
        product.id === editProduct.id
          ? { ...product, ...newProduct, image: imageUrl || product.image }
          : product
      );
      setProducts(updatedProducts);
    } else {
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      setProducts([...products, { id: newId, ...newProduct, image: imageUrl }]);
    }

    setNewProduct({ name: "", price: "", image: "", category: "" });
    setShowAddProductForm(false);
    setEditProduct(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      image: null,
      category: product.category,
    });
    setShowAddProductForm(true);
  };

  const handleDeleteOrder = (index) => {
    const updated = [...orders];
    updated.splice(index, 1);
    setOrders(updated);
    localStorage.setItem("allOrders", JSON.stringify(updated));
  };

  
  const handleFeedbackChange = (index, field, value) => {
    const updated = [...orders];
    updated[index][field] = value;
    setOrders(updated);
    localStorage.setItem("allOrders", JSON.stringify(updated));
  };

  return (
    <div className="admin-dashboard">
      <h2 style={{ color: "#6d4c41" }}>Admin Dashboard</h2>

      <button onClick={() => setShowAddProductForm(true)} className="btn1">Add Post</button>

      {showAddProductForm && (
        <div className="add-product-form">
          <h3 className="form-title">{editProduct ? "Update Product" : "Product Details"}</h3>

          <div className="form-group">
            <label>Item Name:</label>
            <input
              type="text"
              placeholder="Enter Item Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Item Price:</label>
            <input
              type="number"
              placeholder="Enter Item Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Add Item Image:</label>
            <input
              type="file"
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
            />
          </div>

          <div className="form-group">
            <label>Select Page Category:</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            >
              <option value="">Home</option>
              <option value="Textile Handicrafts">Textile Handicrafts</option>
              <option value="Wooden Handicrafts">Wooden Handicrafts</option>
              <option value="Ceramic Handicrafts">Ceramic Handicrafts</option>
              <option value="Paper Handicrafts">Paper Handicrafts</option>
              <option value="Metal Handicrafts">Metal Handicrafts</option>
              <option value="Miscellaneous Handicrafts">Miscellaneous Handicrafts</option>
            </select>
          </div>

          <button onClick={handleAddOrUpdateProduct} className="upload-btn">
            {editProduct ? "Update" : "Upload"}
          </button>
        </div>
      )}

      {/* Product Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>
                <img src={product.image} alt={product.name} style={{ width: "250px" }} />
              </td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => handleEditProduct(product)} className="edit">Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     {/* User Update Link */}
<Link
  to="/user-dashboard"
  style={{
    backgroundColor: "rgb(225, 65, 65)",
    color: "white",
    padding: "10px 20px",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    display: "inline-block",
    marginTop: "20px",
    marginRight: "15px", // <-- spacing here
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "0.3s",
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "crimson")}
  onMouseOut={(e) => (e.target.style.backgroundColor = "rgb(225, 65, 65)")}
>
  User's Update
</Link>

<Link
  to={{
    pathname: "/order-dashboard",
    state: { orders: orders }, // Pass orders data as state
  }}
  style={{
    backgroundColor: "rgb(225, 65, 65)",
    color: "white",
    padding: "10px 20px",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    display: "inline-block",
    marginTop: "20px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "0.3s",
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "crimson")}
  onMouseOut={(e) => (e.target.style.backgroundColor = "rgb(225, 65, 65)")}
>
  Order's Update
</Link>


    </div>
  );
};

export default AdminDashboard;
