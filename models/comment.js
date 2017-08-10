'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    title: DataTypes.STRING(20),
    body: DataTypes.STRING(100),
    userid: DataTypes.INTEGER,
    username: DataTypes.STRING(255)
  }, {});

  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {as:'User', foreignKey: 'userid'});
    Comment.hasMany(models.Like, {as:'Like', foreignKey: 'commentId'});
  }

  return Comment;
};
