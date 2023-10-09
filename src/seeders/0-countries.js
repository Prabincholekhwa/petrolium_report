"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "countries",
      [
        {
            id:1,
            name:"Saudi Arabia",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id:2,
            name:"Isereal",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id:3,
            name:"USA",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id:4,
            name:"Russia",
            created_at: new Date(),
            updated_at: new Date(),
        }
    ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("countries", null, {});
  },
};
