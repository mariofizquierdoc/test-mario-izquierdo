const { listAllUsersService, showProfileService, saveProfileService, listStatsService } = require('../services/profileService');

const listAllUsers = async (req, res) => {
	try {
		const users = await listAllUsersService();
		return res.status(200).json(users);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

const showProfile = async (req, res) => {
	try {
		const { profileInfo, projects, tasks } = await showProfileService(req.user.id);
		return res.status(200).json({profileInfo: profileInfo, projects: projects, tasks: tasks});
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

const saveProfile = async (req, res) => {
	try {
		const { firstName, lastName } = req.body;
		const profileInfo = await saveProfileService(firstName, lastName, req.user.id);
		return res.status(201).json(profileInfo);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

const listStats = async (req, res) => {
	try {
		const stats = await listStatsService(req.user.id);
		return res.status(200).json(stats);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

module.exports = { listAllUsers, showProfile, saveProfile, listStats };