import express from 'express';
import helmet from 'helmet';

import BookRoute from './BookRoute';
import OrderRoute from './OrderRoute'

const app = express();
app.use(helmet.hidePoweredBy());

app.use('/books',BookRoute);
app.use('/orders',OrderRoute);

export default app;