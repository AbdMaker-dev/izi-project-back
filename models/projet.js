'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Projet.belongsTo(models.User);
      models.Projet.hasMany(models.Tache);
      models.Projet.hasMany(models.Membre);
    }
  };
  Projet.init({
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
    modelName: 'Projet',
    tableName: 'projet'
  });
  return Projet;
};