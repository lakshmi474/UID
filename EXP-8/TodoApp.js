import React, { useState } from "react";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const addTask = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: task, status: "pending" }]);
    setTask("");
  };

  const updateStatus = (id, newStatus) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const filteredTodos = showCompleted 
    ? todos 
    : todos.filter(todo => todo.status !== "completed");

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 To-Do List</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addButton}>
          Add
        </button>
      </div>

      <div style={styles.filterContainer}>
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          style={styles.toggleButton}
        >
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </button>
      </div>

      <ul style={styles.list}>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            <span style={styles.taskText}>
              {todo.text}
            </span>
            <div style={styles.statusContainer}>
              <button
                onClick={() => updateStatus(todo.id, "pending")}
                style={{
                  ...styles.statusButton,
                  backgroundColor: todo.status === "pending" ? "#ffc107" : "#f8f9fa",
                  color: todo.status === "pending" ? "white" : "#6c757d"
                }}
              >
                Pending
              </button>
              <button
                onClick={() => updateStatus(todo.id, "in-progress")}
                style={{
                  ...styles.statusButton,
                  backgroundColor: todo.status === "in-progress" ? "#007bff" : "#f8f9fa",
                  color: todo.status === "in-progress" ? "white" : "#6c757d"
                }}
              >
                In Progress
              </button>
              <button
                onClick={() => updateStatus(todo.id, "completed")}
                style={{
                  ...styles.statusButton,
                  backgroundColor: todo.status === "completed" ? "#28a745" : "#f8f9fa",
                  color: todo.status === "completed" ? "white" : "#6c757d"
                }}
              >
                Completed
              </button>
              <button
                onClick={() => deleteTask(todo.id)}
                style={styles.deleteButton}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "12px",
    background: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  addButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  taskText: {
    flex: 1,
    textAlign: "left",
    marginRight: "10px",
  },
  filterContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  toggleButton: {
    padding: "8px 16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    background: "#f8f9fa",
    cursor: "pointer",
    fontSize: "14px",
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    flexWrap: "wrap",
  },
  statusButton: {
    padding: "4px 8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "10px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  deleteButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
  },
};
