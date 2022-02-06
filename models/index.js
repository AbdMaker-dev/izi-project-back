
'use strict';
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_URERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: "postgres",
        operatosAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            timestamps: false
        }
    }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./user')(sequelize, Sequelize.DataTypes);
db.projet = require('./projet')(sequelize, Sequelize.DataTypes);
db.tache = require('./tache')(sequelize, Sequelize.DataTypes);
db.etatTache = require('./etatTache')(sequelize, Sequelize.DataTypes);
db.membre = require('./membre')(sequelize, Sequelize.DataTypes);


db.projet.belongsTo(db.user, {
    as: 'user',
    foreignKey: {
        name: 'idUser'
    }
});
db.projet.hasMany(db.membre, {
    as: 'membres',
    foreignKey: {
        name: 'idPojet'
    }
});
db.projet.hasMany(db.tache, {
    as: 'taches',
    foreignKey: {
        name: 'idProjet'
    }
});
db.tache.belongsTo(db.etatTache, {
    as: 'projet_etat',
    foreignKey: {
        name: 'idEtatTache'
    }
});
db.tache.belongsTo(db.user, {
    as: 'tache_user',
    foreignKey: {
        name: 'idMembre'
    }
});
db.membre.belongsTo(db.user, {
    as: 'membre',
    foreignKey: {
        name: 'idUser'
    }
});
module.exports = db;
