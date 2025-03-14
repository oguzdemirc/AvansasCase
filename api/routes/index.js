import express from 'express';
import helmet from 'helmet';
import BookRoute from './BookRoute';

const app = express();
app.use(helmet.hidePoweredBy());
app.use('/books',BookRoute)
export default app;