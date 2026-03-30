const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { protect } = require('../middleware/authMiddleware');

// Get task statistics for dashboard
router.get('/stats', protect, async (req, res) => {
  try {
    const now = new Date();

    const tasks = await Task.find({ user: req.user._id });

    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(task => task.status === 'pending').length;
    const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;

    const overdueTasks = tasks.filter(task => {
      return (
        task.dueDate &&
        new Date(task.dueDate) < now &&
        task.status !== 'completed'
      );
    }).length;

    const completionRate =
      totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

    res.json({
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      highPriorityTasks,
      overdueTasks,
      completionRate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all tasks with search, filter, and sort
router.get('/', protect, async (req, res) => {
  try {
    const { search, status, priority, category, sortBy = 'createdAt', order = 'desc' } = req.query;

    const query = { user: req.user._id };

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    if (category) {
      query.category = category;
    }

    const sortOrder = order === 'asc' ? 1 : -1;

    const tasks = await Task.find(query).sort({ [sortBy]: sortOrder });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create task
router.post('/', protect, async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      category,
      dueDate,
    } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      status,
      priority,
      category,
      dueDate,
      completedAt: status === 'completed' ? new Date() : null,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update task
router.put('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const {
      title,
      description,
      status,
      priority,
      category,
      dueDate,
    } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) {
      task.status = status;
      task.completedAt = status === 'completed' ? new Date() : null;
    }
    if (priority !== undefined) task.priority = priority;
    if (category !== undefined) task.category = category;
    if (dueDate !== undefined) task.dueDate = dueDate;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete task
router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();

    res.json({ message: 'Task removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;