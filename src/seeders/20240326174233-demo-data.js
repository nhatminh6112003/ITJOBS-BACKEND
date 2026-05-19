'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const passwordHash = await bcrypt.hash('password123', 10);
		const adminId = '550e8400-e29b-41d4-a716-446655440000';
		const recruiterId = '550e8400-e29b-41d4-a716-446655440001';
		const companyId = '550e8400-e29b-41d4-a716-446655440002';
		const jobPostId = '550e8400-e29b-41d4-a716-446655440003';

		// Seed Admin Account
		await queryInterface.bulkInsert('user_account', [
			{
				id: adminId,
				firstname: 'Super',
				lastname: 'Admin',
				email: 'admin@itjobs.com',
				password: passwordHash,
				user_type_id: 3, // Admin
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);

		// Seed Recruiter Account
		await queryInterface.bulkInsert('user_account', [
			{
				id: recruiterId,
				firstname: 'John',
				lastname: 'Doe',
				email: 'recruiter@itjobs.com',
				password: passwordHash,
				user_type_id: 2, // Người tuyển dụng
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);

		// Seed Company for Recruiter
		await queryInterface.bulkInsert('company', [
			{
				id: companyId,
				user_account_id: recruiterId,
				company_name: 'IT Jobs Tech',
				company_type: 1,
				provinces: 1, 
				company_size: '50-100',
				tax_code: '123456789',
				address: '123 Tech Road, District 1, HCM',
				contact_name: 'John Doe',
				contact_phone: '0987654321',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);

		// Seed Job Post
		const jobs = [
			{
				id: jobPostId,
				posted_by_id: recruiterId,
				company_id: companyId,
				job_title: 'Software Engineer Node.js',
				job_position_value: 3, // Assuming 3 is Nhân viên
				job_experience_value: 2, // 2 years
				address: '123 Tech Road, District 1, HCM',
				min_salary: 1000,
				max_salary: 2000,
				expiry_date: new Date(new Date().setDate(new Date().getDate() + 30)),
				posted_date: new Date(),
				job_desc: 'We are looking for a Node.js developer to join our team. Responsibilities include building back-end services, collaborating with front-end developers, and optimizing performance.',
				job_request: 'Minimum 2 years of experience with Node.js. Knowledge of SQL databases (MySQL). Experience with RESTful APIs.',
				status: 1, // Active
				createdAt: new Date(),
				updatedAt: new Date()
			}
		];

		const jobTitles = [
			'Frontend Developer (React)', 'Senior Java Engineer', 'DevOps Specialist', 
			'Python Data Scientist', 'Full Stack Developer', 'Mobile App Developer (Flutter)',
			'QA Automation Engineer', 'UI/UX Designer', 'Product Manager', 'Cloud Architect',
			'Security Engineer', 'PHP Developer (Laravel)', 'Embedded Systems Engineer',
			'Data Engineer', 'Machine Learning Engineer', 'Technical Architect',
			'Bridge SE (Japanese)', 'Game Developer (Unity)', 'Golang Developer', 'Systems Administrator'
		];

		for (let i = 0; i < 20; i++) {
			jobs.push({
				id: `550e8400-e29b-41d4-a716-4466554401${(i + 1).toString().padStart(2, '0')}`,
				posted_by_id: recruiterId,
				company_id: companyId,
				job_title: jobTitles[i],
				job_position_value: (i % 5) + 1,
				job_experience_value: (i % 8) + 1,
				address: `${100 + i} Innovation Way, District ${(i % 10) + 1}, HCM`,
				min_salary: 1000 + (i * 100),
				max_salary: 2000 + (i * 200),
				expiry_date: new Date(new Date().setDate(new Date().getDate() + 30 + i)),
				posted_date: new Date(),
				job_desc: `Exciting opportunity for a ${jobTitles[i]} to join our innovative team. You will work on cutting-edge technologies and contribute to high-impact projects.`,
				job_request: `We require ${ (i % 8) + 1 } years of professional experience, strong problem-solving skills, and a solid understanding of modern software development practices.`,
				status: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			});
		}

		await queryInterface.bulkInsert('job_post', jobs);
	},

	async down(queryInterface, Sequelize) {
		const jobIds = ['550e8400-e29b-41d4-a716-446655440003'];
		for (let i = 1; i <= 20; i++) {
			jobIds.push(`550e8400-e29b-41d4-a716-4466554401${i.toString().padStart(2, '0')}`);
		}
		await queryInterface.bulkDelete('job_post', { id: jobIds }, {});
		await queryInterface.bulkDelete('company', { id: '550e8400-e29b-41d4-a716-446655440002' }, {});
		await queryInterface.bulkDelete('user_account', { id: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'] }, {});
	}
};
