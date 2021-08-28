'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'tache', // name of Source model
            'idMembre', // name of the key we're adding 
            {
                type: Sequelize.INTEGER,
                references: {
                    model: 'membre', // name of Target model
                    key: 'id', // key in Target model that we're referencing
                }
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'tache', // name of Source model
            'idMembre' // key we want to remove
        );
    },
};