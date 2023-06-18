'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
			{ welfare_type: 'Chế độ bảo hiểm' },
			{ welfare_type: 'Đào tạo' },
			{ welfare_type: 'Du lịch' },
			{ welfare_type: 'Phụ cấp' },
			{ welfare_type: 'Nghỉ phép năm' },
			{ welfare_type: 'Xe đưa đón' },
			{ welfare_type: 'Tăng lương' },
			{ welfare_type: 'Laptop' },
			{ welfare_type: 'Tăng lương' },
			{ welfare_type: 'Du lịch nước ngoài' },
			{ welfare_type: 'Đồng phục' },
			{ welfare_type: 'Công tác phí' },
			{ welfare_type: 'Phụ cấp thâm niên' },
			{ welfare_type: 'CLB thể thao' },
			{ welfare_type: 'Chăm sóc sức khỏe' },
			{ welfare_type: 'Chế độ thưởng' },

      


		];
		await queryInterface.bulkInsert('job_welfare', data);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
