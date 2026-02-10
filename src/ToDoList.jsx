import React, { useEffect, useState } from "react";

const ToDoList = () => {
  const [input, setInput] = useState("");

  // ✅ Load tasks from localStorage (with done status)
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save tasks to localStorage whenever todos changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(todos));
  }, [todos]);

  function add() {
    const text = input.trim();
    if (!text) return;

    const newTask = {
      id: Date.now(),
      text: text,
      done: false,
    };

    setTodos((prev) => [...prev, newTask]);
    setInput("");
  }

  // ✅ Delete task
  const deleteTask = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // ✅ Toggle done
  const toggleDone = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "420px",
          backgroundColor: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            marginBottom: "15px",
            textAlign: "center",
            color: "#222",
          }}
        >
          My To Do List
        </h2>

        {/* Input Row */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter The Task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />

          <button
            onClick={add}
            style={{
              padding: "10px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#000",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add
          </button>
        </div>

        {/* Tasks */}
        <div>
          {todos.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>
              No tasks yet 🚀
            </p>
          ) : (
            todos.map((task) => (
              <div
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  gap: "10px",
                }}
              >
                {/* Done checkbox */}
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(task.id)}
                  style={{ width: "18px", height: "18px", cursor: "pointer" }}
                />

                {/* Task text */}
                <p
                  style={{
                    flex: 1,
                    margin: 0,
                    fontSize: "15px",
                    color: task.done ? "#999" : "#333",
                    textDecoration: task.done ? "line-through" : "none",
                    fontWeight: task.done ? "normal" : "600",
                  }}
                >
                  {task.text}
                </p>

                {/* Delete button */}
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    border: "1px solid #ff4d4d",
                    backgroundColor: "transparent",
                    color: "#ff4d4d",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;