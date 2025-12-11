const { Sequelize, DataTypes, Model } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');

const registerUser = async (email, password, firstName, lastName) => {
  const existingUser = await models.User.findOne({
    where: {
      email: email
    }
  });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await models.User.create({ email: email, password: hashedPassword, firstName: firstName, lastName: lastName });

  return newUser;
}

const loginUser = async (email, password) => {
  const user = await models.User.findOne({
    where: {
      email: email
    }
  });

  if (! user) {
    throw new Error('Invalid email or password');
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (! validPassword) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '3h' });

  return { token: token, user: user };
}

module.exports = { registerUser, loginUser };