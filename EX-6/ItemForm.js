import React, { useState } from "react";
import "./ItemForm.css";

export default function ItemForm() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemName || !quantity) {
      alert("Please fill in all required fields!");
      return;
    }

    const newItem = {
      id: Date.now(),
      name: itemName,
      description: description,
      quantity: quantity,
    };

    setItems([...items, newItem]);
    setItemName("");
    setDescription("");
    setQuantity("");
  };

  return (
    <div className="item-container">
      {/* Form */}
      <div className="form-card">
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Name:</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">
            + Add Item
          </button>
        </form>
      </div>

      {/* List (now below the form) */}
      <div className="list-card">
        <h3>Item List</h3>
        {items.length === 0 ? (
          <p className="empty-text">No items added yet</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> ({item.quantity}) <br />
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
