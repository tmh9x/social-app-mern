import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  likes: {
    type: Number,
  },
});

const Post = mongoose.model("post", postsSchema);

export default Post;
