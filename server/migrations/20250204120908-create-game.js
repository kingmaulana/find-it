"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Games", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      deckCards: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER)),
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "waiting",
      },
      totalDecks: {
        type: Sequelize.INTEGER,
        defaultValue: 10,
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
    await queryInterface.dropTable("Games");
  },
};
