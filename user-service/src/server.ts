import express from "express";

import config from "./config/config";
import authRoutes from "./routes/authRoutes";
import { connectDB } from "./database";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);

connectDB();

app.listen(config.PORT, () => {
  console.log(`Server is running on localhost:${config.PORT}`);
});
