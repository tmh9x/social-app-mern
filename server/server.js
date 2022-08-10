import * as dotenv from "dotenv";

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/posts.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on Port: " + port);
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/api", router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err));
