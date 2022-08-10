import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});
const Post = mongoose.model("Post", postSchema);
export default Post;
