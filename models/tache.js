'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tache extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Tache.belongsTo(models.Projet);
      models.Tache.belongsTo(models.EtatTache);
      models.Tache.belongsTo(models.User);
    }
  };
  Tache.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    libelle: DataTypes.STRING,
    description: DataTypes.TEXT,
    dateCreation: DataTypes.DATE,
    dataFin: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tache',
    tableName: 'tache'
  });
  return Tache;
};