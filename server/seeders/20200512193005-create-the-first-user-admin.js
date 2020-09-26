"use strict";
const { hashPassword } = require("../helpers");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    email: "zero@demo.com",
                    password: await hashPassword("zero"),
                    RoleId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    email: "one@demo.com",
                    password: await hashPassword("one"),
                    RoleId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {
                validate: true,
                individualHooks: true,
            }
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
        await queryInterface.bulkDelete("Users", null, {});
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    },
};
