import mongoose from "mongoose";

const postsSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postsSchema);

export default Post;
