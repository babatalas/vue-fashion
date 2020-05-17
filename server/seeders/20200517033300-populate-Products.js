'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: 'Stilo Gra Polkadot Flare Mini Dress',
      description: 'Mini dress dengan detail kancing belakang, tali serut di pinggang dan karet smocked di tangan.',
      stock: 29,
      price: 190000,
      imageUrl: 'https://imager-next.ss-cdn.net/images/resized/480/cc3e60be-d36c-4f55-ab26-831800797db4',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Stilo Kinsley Plaid Ribbon Mini Dress',
      description: 'Mini dress drawstring Ribbon dengan detail kancing depan.',
      stock: 35,
      price: 129000,
      imageUrl: 'https://imager-next.ss-cdn.net/images/resized/480/e83af010-aad2-450e-bccf-8b6574377896',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Stilo Corianna Stripe Buckle Mini Dress',
      description: 'Dress dengan tali buckle ini yang dapat dilepas ini, dapat dikenakan dengan berbagai gaya. Dapat dijadikan outer dan juga dress.',
      stock: 29,
      price: 109000,
      imageUrl: 'https://imager-next.ss-cdn.net/images/resized/480/fe26cdca-cf5a-4648-b15c-0e17f45c7ee5',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Stilo Guillermina Plain Peplum Blouse',
      description: 'Blouse peplum dengan detail resleting belakang dan pita di lengan.',
      stock: 20,
      price: 129000,
      imageUrl: 'https://imager-next.ss-cdn.net/images/resized/480/f0cec854-04f6-4731-a55b-bba7e90852f2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Stilo Nigesha Stripe Buckle Blouse',
      description: 'Blouse V-neck Stripe dengan detail kancing di manset dan tali buckle di sisi samping.',
      stock: 30,
      price: 89000,
      imageUrl: 'https://imager-next.ss-cdn.net/images/resized/480/96649e39-6a64-411b-bf05-199adf618073',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Stilo Gayashi Texture Overlap Outer',
      description: 'Outer Vest dengan detail Kancing depan & Pocket.',
      stock: 40,
      price: 139000,
      imageUrl: 'https://imager-next.ss-cdn.net/images/resized/480/80df591b-4e03-4819-83e2-eedd4405056b',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Stilo Haolla Plaid Double Pockets Mini Dress',
      description: 'Mini dress collar dengan detail kancing depan dan fake pockets.',
      stock: 24,
      price: 159000,
      imageUrl: 'https://imager-next.ss-cdn.net/images/resized/480/89533cc2-b509-4af0-b746-e0065752e79e',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Stilo Hijtara Stripe Drawstring Big Blouse',
      description: 'Bahan tidak panas dan menyerap keringat, namun lebih mudah kusut.',
      stock: 10,
      price: 149000,
      imageUrl: 'https://imager-next.ss-cdn.net/images/resized/480/33887d2b-89c4-4727-992f-c5aed29b9366',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Stilo Averrie Texture Button Big Outer',
      description: 'Outer big size dengan detail pleats di pergelangan tangan, kancing depan dan saku.',
      stock: 20,
      price: 169000,
      imageUrl: 'https://imager-next.ss-cdn.net/images/resized/480/6d3154e0-c341-44cd-bc05-78801429e368',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Kynzee Plain Simple Big Outer',
      description: 'Bahan Cotton tidak panas dan menyerap keringat, namun lebih mudah kusut',
      stock: 6,
      price: 68000,
      imageUrl: 'https://imager-next.ss-cdn.net/images/resized/480/d4829363-adbd-4e18-8415-efe7c4e4ce72',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
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
    return queryInterface.bulkDelete('Products', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
