import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const DB_NAME = process.env.NODE_ENV === 'production' ? process.env.DB_PRODUCTION_NAME : process.env.DB_NAME;

const USER_NAME =
	process.env.NODE_ENV === 'production' ? process.env.DB_PRODUCTION_DB_USERNAME : process.env.DB_USERNAME;

const DB_PASSWORD =
	process.env.NODE_ENV === 'production' ? process.env.DB_PRODUCTION_PASSWORD : process.env.DB_PASSWORD;

const DB_HOST = process.env.NODE_ENV === 'production' ? process.env.DB_PRODUCTION_HOST : process.env.DB_HOST;
export const sequelize = new Sequelize(DB_NAME, USER_NAME, DB_PASSWORD, {
	host: DB_HOST,
	logging: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	dialect: 'mysql',
	// eslint-disable-next-line global-require
	dialectModule: require('mysql2')
});
export const connectDb = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};
