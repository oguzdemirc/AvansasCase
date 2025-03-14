import 'dotenv/config';
import http from 'http';
import swaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import swagger from 'swagger-ui-express';


import swaggerDefinition from './config/swagger';
import LogHelper from './helpers/LogHelper';
import Routes from './api/routes';



const app = express();
app.use(helmet.hidePoweredBy());

const server = http.createServer(app);
async function initializeApp() {
	try {
		// middleware setup
		app.use(bodyParser.urlencoded({extended: false}));
		app.use(bodyParser.json());

		const allowedOrigins = process.env.NODE_ENV === 'dev' ? true  : process.env.CORS_ORIGIN;

		app.use(cors({
			origin: allowedOrigins,
			credentials: true,
			optionsSuccessStatus: 200,
		}));

		if (process.env.SHOW_PERFORMANCE_LOGS === 'true') {
			app.use(LogHelper.performanceLogger());
			app.use(LogHelper.requestTracker());
		}

		// Swagger setup
		const openapiSpecification = await swaggerJsdoc(swaggerDefinition);
		app.use('/api-docs', swagger.serve, swagger.setup(openapiSpecification));

		// Routes
		app.use('/api', Routes);

		app.get('/health', async (req, res) => {
			return res.json({type: true, message: i18next.t('General.healthMessage'), env: process.env.NODE_ENV});
		});
	}
	catch (error) {
		console.error('Failed to initialize application:', error);
		process.exit(1);
	}

}

initializeApp();
const port = process.env.PORT || 8080;
server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});