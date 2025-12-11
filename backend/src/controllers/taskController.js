const { listProjectTasksService, listUserTasksService, showTaskService, showMyTaskService, createTaskService, updateTaskService, updateMyTaskService, deleteTaskService } = require('../services/TaskService');

const listProjectTasks = async (req, res) => {
	try {
		const tasks = await listProjectTasksService(req.params.projectId);
		return res.status(200).json(tasks);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

const listUserTasks = async (req, res) => {
	try {
		const status = req.query.status;
		const priority = req.query.priority;
		const tasks = await listUserTasksService(req.user.id, status, priority);
		return res.status(200).json(tasks);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

const createTask = async (req, res) => {
	try {
		const { name, status, priority, userId } = req.body;
		const newTask = await createTaskService(name, status, priority, userId, req.params.projectId, req.user.id);
		return res.status(201).json(newTask);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

const showTask = async (req, res) => {
	try {
		const task = await showTaskService(req.params.projectId, req.params.id);
		return res.status(200).json(task);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

const showMyTask = async (req, res) => {
	try {
		const task = await showMyTaskService(req.params.id);
		return res.status(200).json(task);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

const updateTask = async (req, res) => {
	try {
		const { name, status, priority, userId } = req.body;
		const updatedTask = await updateTaskService(name, status, priority, userId, req.params.id, req.params.projectId, req.user.id);
		return res.status(200).json(updatedTask);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

const updateMyTask = async (req, res) => {
	try {
		const { status } = req.body;
		const updatedTask = await updateMyTaskService(status, req.params.id, req.user.id);
		return res.status(200).json(updatedTask);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

const deleteTask = async (req, res) => {
	try {
		const message = await deleteTaskService(req.params.id, req.params.projectId, req.user.id);
		return res.status(200).json({ message: message });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

module.exports = { listProjectTasks, listUserTasks, createTask, showTask, showMyTask, updateTask, updateMyTask, deleteTask };