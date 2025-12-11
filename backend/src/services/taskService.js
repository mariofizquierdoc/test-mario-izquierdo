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

const listProjectTasksService = async (projectId) => {
  const project = await models.Project.findOne({where: {id: projectId}});
  const tasks = await project.getTasks({include: 'User'});

  return tasks;
}

const listUserTasksService = async (userId, status, priority) => {
  const where = {};
  if (status) {
    where.status = parseInt(status);
  }
  if (priority) {
    where.priority = parseInt(priority);
  }
  const user = await models.User.findOne({where: {id: userId}});
  const tasks = await user.getTasks({ where: where, include: 'Project' });

  return tasks;
}

const createTaskService = async (name, status, priority, assignedUserId, projectId, userId) => {
  const user = await models.User.findOne({where: {id: userId}});
  if (! user) {
    throw new Error('User not found!');
  }

  const project = await models.Project.findOne({where: {id: projectId}});
  if (! project) {
    throw new Error('Project not found!');
  }

  if (project.userId != user.id) {
    throw new Error('You do not have authorization to add tasks to this project');
  }

  const newTask = await models.Task.create({ name: name, projectId: projectId, status: status || 1, priority: priority || 1, userId: assignedUserId });

  return newTask;
}

const showTaskService = async (projectId, taskId) => {
  const task = await models.Task.findOne({where: {id: taskId}});
  if (! task) {
    throw new Error('Task not found!');
  }

  const project = await models.Project.findOne({where: {id: projectId}});
  if (! project) {
    throw new Error('Project not found!');
  }

  if (task.projectId != project.id) {
    throw new Error('This task does not belong to that project');
  }

  return task;
}

const showMyTaskService = async (taskId) => {
  const task = await models.Task.findOne({where: {id: taskId}});
  if (! task) {
    throw new Error('Task not found!');
  }

  return task;
}

const updateTaskService = async (name, status, priority, assignedUserId, taskId, projectId, userId) => {
  const task = await models.Task.findOne({where: {id: taskId}});
  if (! task) {
    throw new Error('Task not found!');
  }

  const user = await models.User.findOne({where: {id: userId}});
  if (! user) {
    throw new Error('User not found!');
  }

  const project = await models.Project.findOne({where: {id: projectId}});
  if (! project) {
    throw new Error('Project not found!');
  }

  if (task.projectId != project.id) {
    throw new Error('This task does not belong to that project');
  }

  if (project.userId != user.id) {
    throw new Error('You do not have authorization to update tasks from this project');
  }

  task.name = name;
  task.status = status;
  task.priority = priority;
  task.userId = assignedUserId;
  await task.save();

  return task;
}

const updateMyTaskService = async (status, taskId, userId) => {
  const task = await models.Task.findOne({where: {id: taskId}});
  if (! task) {
    throw new Error('Task not found!');
  }

  const user = await models.User.findOne({where: {id: userId}});
  if (! user) {
    throw new Error('User not found!');
  }

  task.status = status;
  await task.save();

  return task;
}

const deleteTaskService = async (taskId, projectId, userId) => {
  const task = await models.Task.findOne({where: {id: taskId}});
  if (! task) {
    throw new Error('Task not found!');
  }

  const user = await models.User.findOne({where: {id: userId}});
  if (! user) {
    throw new Error('User not found!');
  }

  const project = await models.Project.findOne({where: {id: projectId}});
  if (! project) {
    throw new Error('Project not found!');
  }

  if (task.projectId != project.id) {
    throw new Error('This task does not belong to that project');
  }

  if (project.userId != user.id) {
    throw new Error('You do not have authorization to delete tasks from this project');
  }

  await task.destroy();

  return 'Task deleted successfully';
}

module.exports = { listProjectTasksService, listUserTasksService, createTaskService, showTaskService, showMyTaskService, updateTaskService, updateMyTaskService, deleteTaskService };