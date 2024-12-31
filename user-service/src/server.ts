import express from 'express';

import config from './config/config';
import userRoutes from './routes/authRoutes';
import { connectDB } from './database';
import { errorConverter, errorHandler } from './middleware';
import { Server } from 'http';

const app = express();
let server: Server;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(errorConverter);
app.use(errorHandler);

connectDB();

server = app.listen(config.PORT, () => {
  console.log(`Server is running on localhost:${config.PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHander = (err: unknown) => {
  console.log(err);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHander);
process.on('unhandledRejection', unexpectedErrorHander);
