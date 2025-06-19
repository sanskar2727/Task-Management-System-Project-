import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const [task, setTask] = useState({ title: "", description: "", dueDate: "", priority: "Medium" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:8080/api/tasks", task, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate("/tasks");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      <input placeholder="Title" onChange={(e) => setTask({ ...task, title: e.target.value })} />
      <input placeholder="Description" onChange={(e) => setTask({ ...task, description: e.target.value })} />
      <input type="date" onChange={(e) => setTask({ ...task, dueDate: e.target.value })} />
      <select onChange={(e) => setTask({ ...task, priority: e.target.value })}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateTask;
