'use strict';
const {hashPassword} = require('../helpers')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'User',
      lastName: 'Zero',
      email: 'covidkiller@demo.com',
      password: await hashPassword('demome'),
      RoleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {
      validate: true, 
      individualHooks: true,
    });
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
