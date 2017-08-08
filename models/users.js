'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    name: DataTypes.STRING(12),
    password: DataTypes.STRING(8)
  }, {});

  users.associate = function (models) {
    users.hasMany(models.comments, {as: 'comments', foreignKey: 'userid'});
      users.hasMany(models.likes, {as:'likes', foreignKey: 'userId'});
  }

  return users;
};
