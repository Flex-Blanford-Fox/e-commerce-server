'use strict';
// const user = require(`./admin.json`)

// user.forEach(user =>{
//   user.createdAt = new Date ()
//   user.updatedAt = new Date ()
// })

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        "email": "admin@mail.com",
        "password": "$2a$10$qV0GNxRHvNMTjNZp9A/IF.eYQHIvcWTrISZUqk9j4o0p7IQe0ClWC",
        "role": "admin",
        "createdAt": "2021-04-23T18:25:43.511Z",
        "updatedAt": "2021-04-23T18:25:43.511Z"
      },
      {
        "email": "wrong@mail.com",
        "password": "$2a$10$qV0GNxRHvNMTjNZp9A/IF.eYQHIvcWTrISZUqk9j4o0p7IQe0ClWC",
        "role": "customer",
        "createdAt": "2021-04-23T18:25:43.511Z",
        "updatedAt": "2021-04-23T18:25:43.511Z"
      }
    ], {})
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};