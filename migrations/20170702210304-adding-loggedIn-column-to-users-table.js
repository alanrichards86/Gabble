'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      queryInterface.addColumn(
          'users',
          'loggedIn',{
            type: Sequelize.BOOLEAN, defaultValue: true
          }
      )

  },

  down: function (queryInterface, Sequelize) {

      queryInterface.removeColumn(
          'users',
          'loggedIn'
      )


  }
};
