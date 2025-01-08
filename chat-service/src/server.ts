import express from 'express';

import config from './config/config';
import { Server } from 'socket.io';

let server: Server;
const app = express();

app.get('/', (req, res) => {
  res.status(200).json('Heeeeellllooooooo');
});

app.listen(config.PORT, () => {
  console.log('Chat service is running on localhost:', config.PORT);
});
