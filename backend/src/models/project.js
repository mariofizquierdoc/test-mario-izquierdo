'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.User = Project.belongsTo(models.User)
      Project.Tasks = Project.hasMany(models.Task)
      Project.Users = Project.belongsToMany(models.User, { as: 'UserCollaborations', through: 'ProjectUsers' })
    }
  }
  Project.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};