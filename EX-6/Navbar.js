import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">📝 My Item List</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#add">Add Item</a></li>
        <li><a href="#list">Items</a></li>
      </ul>
    </nav>
  );
}
