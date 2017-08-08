'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    commentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});

  likes.associate = function(models){
    likes.belongsTo(models.users, {as: 'users', foreignKey: 'userId'});
    likes.belongsTo(models.comments, {as: 'comments', foreignKey: 'userId'});
  }

  return likes;
};
