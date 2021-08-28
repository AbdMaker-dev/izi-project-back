'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EtatTache extends Model {
    static associate(models) {
      // define association here
      models.EtatTache.hasMany(models.Tache);
    }
  };
  EtatTache.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    libelle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EtatTache',
    tableName: 'etatTache'
  });
  return EtatTache;
};