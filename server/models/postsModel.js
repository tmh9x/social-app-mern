import mongoose from "mongoose";
import { usersSchema } from "./usersModel.js";
const { Schema } = mongoose;

const postsSchema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    postPicture: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    likes: {
      type: Array,
    },
    messages: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postsSchema);

export default Post;
