const { Sequelize, DataTypes, Model } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const models = require('../models');

const listAllUsersService = async () => {
  const users = await models.User.findAll();
  return users;
}

const showProfileService = async (userId) => {
  const user = await models.User.findOne({where: {id: userId}});
  if (! user) {
    throw new Error('User not found!');
  }
  const projects = await user.getProjects();
  const tasks = await user.getTasks();

  return { profileInfo: { firstName: user.firstName, lastName: user.lastName, email: user.email }, projects: projects, tasks: tasks };
}

const saveProfileService = async (firstName, lastName, userId) => {
  const user = await models.User.findOne({where: {id: userId}});
  if (! user) {
    throw new Error('User not found!');
  }

  user.firstName = firstName;
  user.lastName = lastName;
  await user.save();

  return {profileInfo: { firstName: user.firstName, lastName: user.lastName, email: user.email }};
}

const listStatsService = async (userId) => {
  const user = await models.User.findOne({where: {id: userId}});
  if (! user) {
    throw new Error('User not found!');
  }

  const projectsCollab = await user.getProjectCollaborations();
  const totalTasks = await user.getTasks();
  const pendingTasks = await user.getTasks({where: {status: 1}});
  const inProgressTasks = await user.getTasks({where: {status: 2}});
  const completedTasks = await user.getTasks({where: {status: 3}});

  return {stats: { projectsCollab: projectsCollab, totalTasks: totalTasks, pendingTasks: pendingTasks, inProgressTasks: inProgressTasks, completedTasks: completedTasks }};
}

module.exports = { listAllUsersService, showProfileService, saveProfileService, listStatsService };