"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserGame.belongsTo(models.User, { foreignKey: "UserId" });
      UserGame.belongsTo(models.Game, { foreignKey: "GameId" });
    }
  }
  UserGame.init(
    {
      UserId: DataTypes.INTEGER,
      GameId: DataTypes.INTEGER,
      playerCards: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER)),
    },
    {
      sequelize,
      modelName: "UserGame",
    }
  );
  return UserGame;
};
