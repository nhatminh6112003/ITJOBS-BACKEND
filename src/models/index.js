const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`../config/config.json`)[env];
const db = {};
require('dotenv').config();

let sequelize;
if (env === 'production') {
	const configProduction = {
		username: process.env.DB_PRODUCTION_USERNAME,
		password: process.env.DB_PRODUCTION_PASSWORD,
		database: process.env.DB_PRODUCTION_NAME,
		host: process.env.DB_PRODUCTION_HOST,
		dialect: 'mysql'
	};
	sequelize = new Sequelize(process.env.DB_PRODUCTION_NAME, process.env.DB_PRODUCTION_USERNAME, process.env.DB_PRODUCTION_PASSWORD, configProduction);
} else {
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, config);
}

fs.readdirSync(__dirname)
	.filter(
		(file) =>
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1
	)
	.forEach((file) => {
		// eslint-disable-next-line import/no-dynamic-require, global-require
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
