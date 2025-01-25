'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commentaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Commentaire.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Commentaire.belongsTo(models.Annonce, { foreignKey: 'annonce_id', as: 'annonce' });
    }
  }
  Commentaire.init({
    id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true },
    objet: DataTypes.STRING,
    date_commentaire: DataTypes.DATE,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Commentaire',
  });
  return Commentaire;
};
