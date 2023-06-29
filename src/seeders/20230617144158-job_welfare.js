'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const data = [
			{ id: 1, welfare_type: 'Chế độ bảo hiểm' },
			{ id: 2, welfare_type: 'Đào tạo' },
			{ id: 3, welfare_type: 'Du lịch' },
			{ id: 4, welfare_type: 'Phụ cấp' },
			{ id: 5, welfare_type: 'Nghỉ phép năm' },
			{ id: 6, welfare_type: 'Xe đưa đón' },
			{ id: 7, welfare_type: 'Tăng lương' },
			{ id: 8, welfare_type: 'Laptop' },
			{ id: 9, welfare_type: 'Tăng lương' },
			{ id: 10, welfare_type: 'Du lịch nước ngoài' },
			{ id: 11, welfare_type: 'Đồng phục' },
			{ id: 12, welfare_type: 'Công tác phí' },
			{ id: 13, welfare_type: 'Phụ cấp thâm niên' },
			{ id: 14, welfare_type: 'CLB thể thao' },
			{ id: 15, welfare_type: 'Chăm sóc sức khỏe' },
			{ id: 16, welfare_type: 'Chế độ thưởng' }
		];
		await queryInterface.bulkInsert('job_welfare', data);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	}
};
