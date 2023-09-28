'use strict';
const fs = require("fs")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const dataJSON = JSON.parse(fs.readFileSync("./data/youtube.json", "utf-8"))
    const dataSeed = dataJSON.map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    return queryInterface.bulkInsert("Songs", dataSeed, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Songs", null, {})
  }
    
};
