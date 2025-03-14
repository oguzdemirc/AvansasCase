import morgan from 'morgan';

import db from '../api/db/models';

class LogHelper {

	static performanceLogger() {
		return (req, res, next) => {
			const start = Date.now();
			res.on('finish', () => {
				const end = Date.now();
				const duration = end - start;
				console.log(`${req.method} - ${req.originalUrl} took ${duration}ms`);
			});
			next();
		};
	}

	static requestTracker() {
		return (req, res, next) => {
			const start = process.hrtime();
			res.on('finish', () => {
				const duration = process.hrtime(start);
				const milliseconds = duration[0] * 1000 + duration[1] / 1000000;

				if (milliseconds > 1000) {
					console.log(`Slow request: ${req.method} ${req.path} took ${milliseconds}ms`);
				}
			});
			next();
		};
	}

}

export default LogHelper;