import express from 'express';
import bodyParser from 'body-parser';
import { errorHandler } from './utils/error-handling';

const app = express();

app.use(bodyParser.json());

import userRoutes from './routes/user.routes';
import transactionRoutes from './routes/transaction.routes';
import invoiceRoutes from './routes/invoice.routes';

app.use('/api', userRoutes);
app.use('/api', transactionRoutes);
app.use('/api', invoiceRoutes);

app.use(errorHandler);

export default app;
