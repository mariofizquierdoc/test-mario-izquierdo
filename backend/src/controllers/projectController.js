const { listAllProjectsService, listUserProjectsService, createProjectService, updateProjectService, showProjectService, getProjectRelatedUsersService, deleteProjectService } = require('../services/projectService');

const listAllProjects = async (req, res) => {
	try {
		const projects = await listAllProjectsService();
		return res.status(200).json(projects);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

const listUserProjects = async (req, res) => {
	try {
		const projects = await listUserProjectsService(req.user.id);
		return res.status(200).json(projects);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

const createProject = async (req, res) => {
	try {
		const { name, userIds } = req.body;
		const newProject = await createProjectService(name, userIds, req.user.id);
		return res.status(201).json(newProject);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

const showProject = async (req, res) => {
	try {
		const { project, users } = await showProjectService(req.params.id);
		return res.status(200).json({project: project, userIds: users.map(u => u.id)});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

const showProjectRelatedUsers = async (req, res) => {
	try {
		const { project, users } = await getProjectRelatedUsersService(req.params.id);
		return res.status(200).json({ project: project, users: users });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

const updateProject = async (req, res) => {
	try {
		const { name, userIds } = req.body;
		const project = await updateProjectService(name, userIds, req.params.id, req.user.id);
		return res.status(200).json({ project: project });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

const deleteProject = async (req, res) => {
	try {
		const message = await deleteProjectService(req.params.id, req.user.id);
		return res.status(200).json({ message: message });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

module.exports = { listAllProjects, listUserProjects, createProject, showProject, showProjectRelatedUsers, updateProject, deleteProject };