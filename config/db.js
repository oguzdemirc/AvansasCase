require('dotenv').config();

module.exports = {
	dev: {
		database: process.env.DB_NAME,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'postgres',
		logging: process.env.DB_LOGGING === 'true' ? console.log : false,
		minifyAliases: true,
		timezone: '+03:00',
	},
};