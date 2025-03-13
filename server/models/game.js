"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.hasMany(models.UserGame, { foreignKey: "GameId" });
    }
  }
  Game.init(
    {
      deckCards: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER)),
      status: DataTypes.STRING,
      totalDecks: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
