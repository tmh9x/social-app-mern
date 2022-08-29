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

const createPost = async (req, res) => {
  console.log("req.body", req.body);
  const existingPost = await Post.findById(req.body._id);
  if (existingPost) {
    res.status(409).json({ message: "post already exists" });
  } else {
    const newPost = new Post({
      postPicture: req.body.newPostPicture,
      description: req.body.description,
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

const getPosts = async (req, res) => {
  console.log("req von getPost", req.user);
  const post = await Post.find({});
  if (post.length === 0) {
    res.status(404).json({ message: "not working" });
  } else {
    res.status(200).json({ post });
    console.log("post", post);
  }
};

export { uploadPostPicture, getPosts, createPost };
