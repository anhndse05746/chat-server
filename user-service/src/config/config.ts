import dotenv from "dotenv";

const configFile = "./.env";
dotenv.config({ path: configFile });

const { PORT, JWT_SECRET, MONGO_URI, MESSAGE_BROKER_URL, NODE_ENV, DB_NAME } =
  process.env;

export const isProdEnv = NODE_ENV === "production";

export default {
  PORT,
  JWT_SECRET,
  MONGO_URI,
  DB_NAME,
  MESSAGE_BROKER_URL,
};
