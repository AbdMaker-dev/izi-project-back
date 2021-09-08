
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

module.exports = db;
