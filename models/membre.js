'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membre extends Model {
    static associate(models) {
      // define association here
      // models.Membre.hasMany(models.Tache);
      models.Membre.belongsTo(models.Projet);
      models.Membre.belongsTo(models.User);
    }
  };
  Membre.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    etat: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Membre',
    tableName: 'membre'
  });
  return Membre;
};