import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import "../App.css";

// Your static categories object
const categories = {
  "Textile Handicrafts": [
    { id: 1, name: "Handloom Sarees", image: "saree.jpg", price: 1200, quantity: 10, discount: 10 },
    { id: 2, name: "Embroidered Dupattas", image: "dupatta.jpg", price: 500, quantity: 15, discount: 5 },
    { id: 3, name: "Hand-painted Fabrics", image: "fabric.jpg", price: 400, quantity: 20, discount: 8 },
    { id: 4, name: "Quilts & Blankets", image: "quilt.jpg", price: 1500, quantity: 5, discount: 12 },
    { id: 5, name: "Handmade Bags", image: "bag.jpg", price: 500, quantity: 25, discount: 7 },
  ],
  "Wooden Handicrafts": [
    { id: 6, name: "Wooden Decorative Box", image: "wooden_box.jpg", price: 500, quantity: 8, discount: 10 },
    { id: 7, name: "Hand-carved Wooden Figurines", image: "figurine.jpg", price: 1800, quantity: 6, discount: 15 },
    { id: 8, name: "Wooden Wall Hangings", image: "wooden_wall.jpg", price: 1000, quantity: 12, discount: 7 },
    { id: 9, name: "Handmade Wooden Jewelry Box", image: "wooden_jewelry_box.jpg", price: 1300, quantity: 9, discount: 10 },
    { id: 10, name: "Wooden Coasters", image: "wooden_coasters.jpg", price: 200, quantity: 20, discount: 5 },
  ],
  "Ceramic Handicrafts": [
    { id: 11, name: "Hand-painted Ceramic Plates", image: "ceramic_plate.jpg", price: 600, quantity: 12, discount: 5 },
    { id: 12, name: "Ceramic Decorative Vases", image: "ceramic_vase.jpg", price: 1000, quantity: 7, discount: 10 },
    { id: 13, name: "Handmade Ceramic Mugs", image: "ceramic_mug.jpg", price: 300, quantity: 15, discount: 8 },
    { id: 14, name: "Ceramic Wall Hangings", image: "ceramic_wall.jpg", price: 1100, quantity: 10, discount: 6 },
    { id: 15, name: "Hand-painted Ceramic Tiles", image: "ceramic_tile.jpg", price: 750, quantity: 14, discount: 7 },
  ],
  "Paper Handicrafts": [
    { id: 16, name: "Handmade Paper Cards", image: "paper_card.jpg", price: 100, quantity: 30, discount: 8 },
    { id: 17, name: "Paper Mache Decorative Items", image: "paper_mache.jpg", price: 700, quantity: 10, discount: 6 },
    { id: 18, name: "Hand-painted Paper Bags", image: "paper_bag.jpg", price: 250, quantity: 20, discount: 7 },
    { id: 19, name: "Origami Decorative Items", image: "origami.jpg", price: 350, quantity: 25, discount: 5 },
    { id: 20, name: "Handmade Paper Jewelry", image: "paper_jewelry.jpg", price: 150, quantity: 15, discount: 9 },
  ],
  "Metal Handicrafts": [
    { id: 21, name: "Handmade Metal Jewelry", image: "metal_jewelry.jpg", price: 700, quantity: 14, discount: 9 },
    { id: 22, name: "Metal Decorative Items", image: "metal_decor.jpg", price: 1300, quantity: 5, discount: 12 },
    { id: 23, name: "Hand-carved Metal Figurines", image: "metal_figurine.jpg", price: 1800, quantity: 8, discount: 10 },
    { id: 24, name: "Metal Wall Hangings", image: "metal_wall.jpg", price: 1500, quantity: 10, discount: 8 },
    { id: 25, name: "Handmade Metal Wind Chimes", image: "wind_chime.jpg", price: 950, quantity: 12, discount: 6 },
  ],
  "Miscellaneous Handicrafts": [
    { id: 26, name: "Handmade Soaps", image: "soap.jpg", price: 100, quantity: 50, discount: 5 },
    { id: 27, name: "Hand-painted Planters", image: "planter.jpg", price: 400, quantity: 20, discount: 7 },
    { id: 28, name: "Essential Oil Diffusers", image: "diffuser.jpg", price: 300, quantity: 10, discount: 6 },
  ]
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [adminProducts, setAdminProducts] = useState([]);

  // Load the adminProducts saved via AdminDashboard from localStorage
  useEffect(() => {
    const savedAdminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
    setAdminProducts(savedAdminProducts);
  }, []);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);
    const selectedQuantity = quantities[product.id] || 1;

    if (existingItem) {
      existingItem.quantity += selectedQuantity;
    } else {
      cart.push({ ...product, quantity: selectedQuantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart");
  };

  const handleQuantityChange = (id, newQuantity) => {
    setQuantities((prev) => ({ ...prev, [id]: parseInt(newQuantity) }));
  };

  // Merge static category products with any admin-added products that belong to the selected category
  const allProducts = selectedCategory
    ? [
        ...(categories[selectedCategory] || []),
        ...adminProducts.filter((product) => product.category === selectedCategory)
      ]
    : [];

  return (
    <div className="container">
      {!selectedCategory ? (
        <div className="grid-container">
          {Object.keys(categories).map((category) => (
            <div
              key={category}
              className="category-card"
              onClick={() => setSelectedCategory(category)}
            >
              <img
                src={`/images/${category.toLowerCase().replace(/ /g, "_")}/${category.split(" ")[0].toLowerCase()}_category.jpg`}
                alt={category}
                className="category-image"
                onError={(e) => (e.target.style.display = "none")}
              />
              <h3 className="category-title">{category}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-6xl">
          <button onClick={() => setSelectedCategory(null)} className="back-button">
            <ArrowLeft size={26} />
          </button>
          <div className="grid-container">
            {allProducts.map((product) => (
              <div key={product.id} className="item-card">
                <img
                  src={
                    product.image?.startsWith("blob:")
                      ? product.image
                      : `/images/${selectedCategory.toLowerCase().replace(/ /g, "_")}/${product.image}`
                  }
                  alt={product.name}
                  className="item-image"
                />
                <h3 className="item-title">{product.name}</h3>
                <p className="price">Price: ₹{product.price}</p>
                <p className="discount">{product.discount || 0}% off</p>
                <div className="quantity-container">
                  <label className="quantity-label">Quantity: </label>
                  <select
                    value={quantities[product.id] || 1}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    className="quantity-select"
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
