import React, { useEffect, useState } from "react";
import axios from "axios";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8080/api/tasks?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(res.data.tasks || res.data); 
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching tasks:", err.message);
      }
    };

    fetchTasks();
  }, [page]);

  const handleDelete = async (taskId) => {
    const confirm = window.confirm("Delete this task?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Task deleted");
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      alert("Delete failed");
      console.error("Delete Error:", err.message);
    }
  };

  const handleEdit = async (task) => {
    const newStatus = prompt("Enter new status (Pending or Completed):", task.status);
    if (!newStatus || newStatus === task.status) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:8080/api/tasks/${task._id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Status updated!");
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? res.data : t))
      );
    } catch (err) {
      alert("Update failed");
      console.error("Update Error:", err.message);
    }
  };

  const handlePriorityChange = async (task, newPriority) => {
    if (task.priority === newPriority) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:8080/api/tasks/${task._id}`,
        { priority: newPriority },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Priority updated!");
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? res.data : t))
      );
    } catch (err) {
      alert("Priority update failed");
      console.error("Priority Error:", err.message);
    }
  };

  const highPriority = tasks.filter((t) => t.priority === "High");
  const mediumPriority = tasks.filter((t) => t.priority === "Medium");
  const lowPriority = tasks.filter((t) => t.priority === "Low");

  const renderTaskCard = (task) => (
    <div
      key={task._id}
      style={{
        border: "1px solid gray",
        padding: "10px",
        margin: "5px 0",
        backgroundColor: "#fff",
      }}
    >
      <strong>{task.title}</strong> <br />
      Status:{" "}
      <span style={{ color: task.status === "Pending" ? "orange" : "green" }}>
        {task.status}
      </span>
      <br />
      Due: {new Date(task.dueDate).toLocaleDateString()} <br />
      <label>Priority: </label>
      <select
        value={task.priority}
        onChange={(e) => handlePriorityChange(task, e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <br />
      <button onClick={() => handleEdit(task)}>Edit Status</button>
      <button onClick={() => handleDelete(task._id)}>Delete</button>
    </div>
  );

  return (
    <div className="my-tasks">
      <h2> My Tasks (Priority View)</h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="priority-container" style={{ display: "flex", gap: "20px" }}>
          <div className="priority-box high" style={{ backgroundColor: "#ffd6d6", padding: "10px", flex: 1 }}>
            <h3>🔴 High Priority</h3>
            {highPriority.map(renderTaskCard)}
          </div>

          <div className="priority-box medium" style={{ backgroundColor: "#fff9cc", padding: "10px", flex: 1 }}>
            <h3>🟡 Medium Priority</h3>
            {mediumPriority.map(renderTaskCard)}
          </div>

          <div className="priority-box low" style={{ backgroundColor: "#d6ffd6", padding: "10px", flex: 1 }}>
            <h3>🟢 Low Priority</h3>
            {lowPriority.map(renderTaskCard)}
          </div>
        </div>
      )}

      <div className="pagination" style={{ marginTop: "20px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MyTasks;


