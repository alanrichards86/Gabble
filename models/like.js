'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    commentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});

  Like.associate = function(models){
    Like.belongsTo(models.User, {as: 'User', foreignKey: 'userId'});
    Like.belongsTo(models.Comment, {as: 'Comment', foreignKey: 'userId'});
  }

  return Like;
};
