import Post from "../models/postsModel.js";
import { v2 as cloudinary } from "cloudinary";

const uploadPostPicture = async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "social-app-mern/posts",
    });
    res.status(200).json({
      message: "Image Upload successfull",
      imageUrl: uploadResult.url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Image could not be uploaded", error: error });
  }
};

const createMessage = async (req, res) => {
  console.log("req.bodyBODY", req.body);

  try {
    const message = {
      date: new Date(),
      message: req.body.message,
      userId: req.body.userId,
    };
    const updatedPost = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { messages: message } },
      {
        new: true,
      }
    );

    res.status(200).json({ updatedPost });
  } catch (error) {}

  /* const newMessage = new Message({
    messageId: req.body.messageId,
    message: req.body.message,
    date: req.body.date,
    userId: req.body.userId,
    userName: req.body.userName,
  }); */
};

/* const postComment = async (newsId, comment) => {
  const news = await News.findByIdAndUpdate(newsId, {
    $addToSet: { comments: comment },
  });
  if (!news) {
    throw new ApiError(httpStatus.NOT_FOUND, "News not found");
  }
  return news;
};

const deleteComment = async (newsId, commentId) => {
  const news = await News.findById(newsId);

  if (!news) {
    throw new ApiError(httpStatus.NOT_FOUND, "News not found");
  }
  news.comments.pull({ _id: commentId });
  news.save();
  return news;
}; */

const createPost = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.body", req.body.description);
  const existingPost = await Post.findById(req.body._id);
  if (existingPost) {
    res.status(409).json({ message: "post already exists" });
  } else {
    const newPost = new Post({
      postPicture: req.body.newPostPicture,
      description: req.body.description,
      author: req.user._id,
    });

    try {
      const savedPost = await newPost.save();
      res.status(201).json({
        post: {
          newPostPicture: savedPost.newPostPicture,
          description: savedPost.description,
        },
        message: "Post created successfully",
      });
    } catch (error) {
      res.status(409).json({
        message: error.message,
        error: error,
      });
    }
  }
};

const deletePost = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.body", req.body.description);
  const options = { $pull: {} };
  const deletedPost = await Post.findOneAndRemove(req.body.postId, options);
  res.status(200).json({ message: "post deleted" });
};

const getPosts = async (req, res) => {
  console.log("req von getPost", req.user);
  const post = await Post.find({}).populate("author");
  if (post.length === 0) {
    res.status(404).json({ message: "not working" });
  } else {
    res.status(200).json({ post });
    console.log("post", post);
  }
};

export { uploadPostPicture, getPosts, createPost, createMessage, deletePost };
