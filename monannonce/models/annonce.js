'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Annonce extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Annonce.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
      Annonce.hasMany(models.Commentaire, { foreignKey: 'annonce_id', as: 'commentaires' });
      Annonce.hasMany(models.Signalement, { foreignKey: 'annonce_id', as: 'signalements' });
    }
  }
  Annonce.init({
    titre: DataTypes.STRING,
    description: DataTypes.STRING,
    prix: DataTypes.FLOAT,
    image: DataTypes.STRING,
    statut: DataTypes.STRING,
    categorie: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Annonce',
  });
  return Annonce;
};
