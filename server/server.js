import * as dotenv from "dotenv";

import { cloudinaryConfig } from "./config/cloudinaryConfig.js";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import postsRoute from "./routes/postsRoute.js";
import usersRoute from "./routes/usersRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const startServer = () => {
  app.listen(port, () => {
    console.log("Server is running on Port: " + port);
  });
};

const addMiddleware = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  cloudinaryConfig();
};

const loadRoutes = () => {
  app.use("/api/posts", postsRoute);
  app.use("/api/users", usersRoute);
};

const mongoDbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connection to Mongo DB established");
  } catch (error) {
    console.log(err);
  }
};

(async function controller() {
  await mongoDbConnection();
  addMiddleware();
  loadRoutes();
  startServer();
})();
