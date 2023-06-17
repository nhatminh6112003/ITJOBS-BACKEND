import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: 'localhost',
	logging: true,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	dialect: 'mysql'
});
export const connectDb = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};
