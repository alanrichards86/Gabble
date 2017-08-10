'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING(12),
    password: DataTypes.STRING(20),
    userid: DataTypes.INTEGER
  }, {});

  User.associate = function (models) {
    User.hasMany(models.Comment, {as: 'Comment', foreignKey: 'userid'});
      User.hasMany(models.Like, {as:'Like', foreignKey: 'userId'});
  }

  return User;
};
