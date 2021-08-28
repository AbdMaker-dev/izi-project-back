'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'tache', // name of Source model
            'idEtatTache', // name of the key we're adding 
            {
                type: Sequelize.INTEGER,
                references: {
                    model: 'etatTache', // name of Target model
                    key: 'id', // key in Target model that we're referencing
                }
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'tache', // name of Source model
            'idEtatTache' // key we want to remove
        );
    },
};