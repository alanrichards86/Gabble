'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    name: DataTypes.STRING(12),
    password: DataTypes.STRING(8)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};
