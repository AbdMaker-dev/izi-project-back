'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tache', {
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
      idProjet: {
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
    await queryInterface.dropTable('tache');
  }
};