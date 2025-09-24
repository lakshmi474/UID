import React, { useState } from "react";
import ItemForm from "./components/ItemForm";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  return (
    <div>
      <Navbar />
      <div className="app-container">
        <ItemForm onAddItem={addItem} />
      </div>
    </div>
  );
}

export default App;
