'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('OrderStatuses', [
			{
				id: 1,
				name: 'PENDING', // it can be translatios
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: 'COMPLETED',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				name: 'CANCELLED',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderStatuses', null, {});
  }
};
