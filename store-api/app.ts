import dotenv from 'dotenv';
import 'express-async-errors';

import express from 'express';
import connectDB from './db/connect.js';

import morgan from 'morgan';

import productsRouter from './routes/products.js';

import errorHandlerMiddleware from './middleware/error-handler.js';
import notFound from './middleware/not-found.js';

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/products', productsRouter);
app.get('/api/v1/test', (req, res) => {
  res.status(200).json(req.query);
});

app.use(errorHandlerMiddleware);
app.use(notFound);

async function start() {
  try {
    const { PORT, MONGO_URI } = process.env;
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listen in ${ PORT }`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();