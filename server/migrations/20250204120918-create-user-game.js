"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserGames", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users", 
          key: "id", 
        },
        onUpdate: "CASCADE", 
        onDelete: "CASCADE", 
      },
      GameId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Games", 
          key: "id", 
        },
        onUpdate: "CASCADE", 
        onDelete: "CASCADE", 
      },
      playerCards: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER)),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserGames");
  },
};
