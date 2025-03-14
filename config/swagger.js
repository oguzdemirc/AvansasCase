const path = require('path');
const __dirname = path.resolve();

const swaggerDefinition = {
	swaggerDefinition: {
		openapi: '3.1.0',
		info: {
			title: 'Avansas Case',
			version: '1.0.0',
			description: 'Avansas Case',
		},
		produces: [
			'application/json',
			'application/xml',
			'multipart/form-data',
		],
		servers: [
			{
				url: 'http://localhost:8080/api',
				description: 'Development server',
			},
			{
				url: 'https://127.0.0.1:8080/api',
				description: 'Secure Development server',
			},
		],
	},
	apis: [ `${__dirname}/api/routes/*.js`, `${__dirname}/definations.yaml`],
};

export default swaggerDefinition;