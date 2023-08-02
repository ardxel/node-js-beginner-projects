import 'express-async-errors';

import express from 'express';
import config from './config/index';

import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

import connectDB from "./db/connect";

import loginRoute from "./routes/main";

const app = express();

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', loginRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);


const start = async () => {
  try {
    await connectDB();
    app.listen(config.port, () =>
      console.log(`Server is listening on port ${ config.port }...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
