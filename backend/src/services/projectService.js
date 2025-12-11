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

const listAllProjectsService = async () => {
  const projects = await models.Project.findAll();

  return projects;
}

const listUserProjectsService = async (userId) => {
  const user = await models.User.findOne({where: {id: userId}});
  if (! user) {
    throw new Error('User not found!');
  }
  const projects = await user.getProjects();

  return projects;
}

const createProjectService = async (name, userIds, userId) => {
  const user = await models.User.findOne({where: {id: userId}});
  if (! user) {
    throw new Error('User not found!');
  }

  const newProject = await models.Project.create({ name: name, userId: userId });
  await newProject.addUsers(userIds);

  return newProject;
}

const updateProjectService = async (name, userIds, projectId, userId) => {
  const user = await models.User.findOne({where: {id: userId}});
  if (! user) {
    throw new Error('User not found!');
  }

  const project = await models.Project.findOne({where: {id: projectId}});
  if (! project) {
    throw new Error('Project not found!');
  }

  if (project.userId != user.id) {
    throw new Error('You do not have authorization to update this project');
  }

  project.name = name;
  await project.setUsers(userIds);

  const updatedProject = await project.save();

  return updatedProject;
}

const showProjectService = async (projectId) => {
  const project = await models.Project.findOne({where: {id: projectId}});
  if (! project) {
    throw new Error('Project not found!');
  }

  const users = await project.getUserCollaborations();

  return { project: project, users: users };
}

const getProjectRelatedUsersService = async (projectId) => {
  const project = await models.Project.findOne({where: {id: projectId}});
  if (! project) {
    throw new Error('Project not found!');
  }

  const users = await project.getUserCollaborations();

  return { project: project, users: users };
}

const deleteProjectService = async (projectId, userId) => {
  const user = await models.User.findOne({where: {id: userId}});
  if (! user) {
    throw new Error('User not found!');
  }

  const project = await models.Project.findOne({where: {id: projectId}});
  if (! project) {
    throw new Error('Project not found!');
  }

  if (project.userId != user.id) {
    throw new Error('You do not have authorization to delete this project');
  }

  await project.destroy();
  return 'Project deleted successfully';
}

module.exports = { listAllProjectsService, listUserProjectsService, createProjectService, updateProjectService, showProjectService, getProjectRelatedUsersService, deleteProjectService };