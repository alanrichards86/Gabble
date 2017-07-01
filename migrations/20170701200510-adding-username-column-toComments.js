'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      queryInterface.addColumn(
        'comments',
        'username',{
          type: Sequelize.STRING
        }
      )

  },

  down: function (queryInterface, Sequelize) {

    queryInterface.removeColumn(
      'comments',
      'username'
    )

  }
};
