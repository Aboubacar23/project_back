'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Signalement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Signalement.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Signalement.belongsTo(models.Annonce, { foreignKey: 'annonce_id', as: 'annonce' });
    }
  }
  Signalement.init({
    objet: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Signalement',
  });
  return Signalement;
};
