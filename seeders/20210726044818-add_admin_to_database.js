'use strict';
const user = require(`./admin.json`)
user[0].createdAt = new Date ()
user[0].updatedAt = new Date ()


module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', user, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
