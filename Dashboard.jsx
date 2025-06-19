

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const loadTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:8080/api/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data.tasks || []);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => navigate("/create-task")}>Create Task</button>
      {tasks.map((task) => (
        <div key={task._id}>
          <p><b>{task.title}</b> - {task.status}</p>
          <small>Due: {task.dueDate?.slice(0, 10)}</small>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
