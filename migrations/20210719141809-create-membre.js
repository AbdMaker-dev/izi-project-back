'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('membre', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      etat: {
        type: Sequelize.BOOLEAN
      },
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'user', // name of Target model
          key: 'id', // key in Target model that we're referencing
        }
      },
      idPojet: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'projet', // name of Target model
          key: 'id', // key in Target model that we're referencing
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('membre');
  }
};