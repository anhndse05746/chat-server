import { config } from 'dotenv';

const configFile = './.env';
config({ path: configFile });

const { NODE_ENV, PORT, JWT_SECRET, MESSAGE_BROKER_URL, MONGO_URI, DB_NAME } =
  process.env;

const queue = { notifications: 'NOTIFICATIONS' };

const IsProdEnv = NODE_ENV === 'production';
export default {
  IsProdEnv,
  PORT,
  JWT_SECRET,
  MESSAGE_BROKER_URL,
  MONGO_URI,
  DB_NAME,
  queue,
};
