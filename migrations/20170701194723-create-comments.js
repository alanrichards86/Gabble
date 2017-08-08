'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(20)
      },
      body: {
        type: Sequelize.STRING(100)
      },
      userid: {
        type: Sequelize.INTEGER
        allowNull: false,
        reference: {
          model: 'users',
          key: 'id'
        }
      },
      usersname: {
        type: Sequelize.STRING(30)
        allowNull: false,
        reference: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('comments');
  }
};
