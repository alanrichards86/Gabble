'use strict';
module.exports = function(sequelize, DataTypes) {
  var comments = sequelize.define('comments', {
    title: DataTypes.STRING(20),
    body: DataTypes.STRING(100)
  }, {});

  comments.associate = function (models) {
    comments.belongsTo(models.users, {as:'users', foreignKey: 'userid'});
    comments.hasMany(models.likes, {as:'likes', foreignKey: 'commentId'});
  }

  return comments;
};
