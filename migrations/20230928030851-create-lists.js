'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ProfileId :{
        type: Sequelize.INTEGER,
        references: {
          model: "Profiles",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lists');
  }
};