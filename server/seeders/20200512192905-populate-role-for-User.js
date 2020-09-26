"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Roles",
            [
                {
                    name: "admin",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "customer",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Roles", null, {});
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    },
};
