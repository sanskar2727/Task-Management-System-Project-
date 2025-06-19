const Task = require('../Models/Task');

const createTask = async (req , res) => {
    try {
        const taskData = req.body;
        taskData.assignedTo = req.user._id;

        const task = await Task.create(taskData);
        res.json(task)
    } catch(err) {
     console.error("Error while creating task:", err);
    res.status(500).json({ message: "Something went wrong", err });
    }
};

const getAllTasks = async (req , res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1 )*limit;

    const tasks = await Task.find({assignedTo: req.user._id})
    .skip(skip)
    .limit(limit)

    res.json(tasks);
};

const getTask = async (req,res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not allowed to update this task" });
    }

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not allowed to delete this task" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


const updateStatus = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(task);
}; 
 
const changePriority = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { priority: req.body.priority }, { new: true });
  res.json(task);
};

module.exports = {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    updateStatus,
    changePriority
}