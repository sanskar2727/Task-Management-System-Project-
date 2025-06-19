const express = require('express');
const auth = require('../Middlewear/authMiddleware');

const { createTask, getAllTasks, getTask, updateTask, deleteTask, updateStatus, changePriority } = require('../Controllers/taskController');
const router = express.Router();

router.use(auth);

router.post('/' , createTask);
router.get('/',getAllTasks);
router.get('/:id' , getTask);
router.put('/:id' , updateTask);
router.delete('/:id', deleteTask);
router.patch("/:id/status" , updateStatus);
router.patch('/:id/priority' , changePriority);

module.exports = router;