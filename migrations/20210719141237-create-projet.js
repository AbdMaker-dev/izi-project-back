'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projet', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      libelle: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      dateCreation: {
        type: Sequelize.DATE
      },
      dataFin: {
        type: Sequelize.DATE
      },
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'user', // name of Target model
          key: 'id', // key in Target model that we're referencing
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('projet');
  }
};