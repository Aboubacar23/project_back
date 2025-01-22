'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Annonce, { foreignKey: 'user_id', as: 'annonces'})
      //User.hasMany(models.Signalement, { foreignKey: 'user_id', as: 'signalements' });
      //User.hasMany(models.Commentaire, { foreignKey: 'user_id', as: 'commentaires' });
    }
  }

  User.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
