import Post from "../models/postsModel.js";
import User from "../models/usersModel.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { issueToken } from "../utils/jwt.js";
import { verifyPassword } from "../utils/encryptPassword.js";

const uploadUserPicture = async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "social-app-mern/users",
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

const encryptPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPasswort = await bcrypt.hash(password, salt);
    return hashPasswort;
  } catch (error) {
    console.log("error", error);
  }
};

const signUp = async (req, res) => {
  console.log({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
    avatarPicture: req.body.avatarPicture,
    password: req.body.password,
  });
  try {
    if (req.body.userName === "undefined" || req.body.email === "undefined") {
      res.status(409).json({ success: false, message: "fill all fields" });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ message: "user already exists" });
    } else {
      const hashedPassword = await encryptPassword(req.body.password);

      const newUser = new User({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        birthday: req.body.birthday,
        avatarPicture: req.body.avatarPicture,
      });
      console.log("newUser>>>>", newUser);

      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          user: {
            userName: savedUser.userName,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
            birthday: savedUser.birthday,
            avatarPicture: savedUser.avatarPicture,
          },
          message: "User Registered successfully",
          success: true,
        });
      } catch (error) {
        res.status(409).json({
          success: false,
          message: error.message,
          error: error,
        });
      }
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const login = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) {
    res.status(401).json({ message: "user not found" });
  } else {
    const verified = await verifyPassword(
      req.body.password,
      existingUser.password
    );
    if (!verified) {
      res.status(401).json({ message: "password is incorrect" });
    } else {
      console.log("you are logged in");
      const token = issueToken(existingUser.id);
      res.status(201).json({
        msg: "log in was succuessful",
        user: {
          userName: existingUser.userName,
          email: existingUser.email,
          birthday: existingUser.birthday,
          avatarPicture: existingUser.avatarPicture,
          id: existingUser._id,
        },
        token,
      });
    }
  }
};

const makeLike = async (req, res) => {
  console.log("req", req.body);

  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.body.userId },
      },
      { new: true, overwrite: false }
    );
    console.log("updatePost", updatePost);
    const updateUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        $pull: { likes: req.body.postId },
      },
      { new: true, overwrite: false }
    );
    console.log("updateUser", updateUser);
    res.status(200).json({
      message: "like updated",
      updatePost,
      updateUser,
    });
    console.log("updatePost", updatePost);
  } catch (error) {
    console.log("error", error);
    res.status(409).json({
      message: error,
    });
  }
};

const getProfile = (req, res) => {
  res.status(200).json(req.user);
};

// UPDATE A USER BY ID

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthday: req.body.birthday,
    });
    console.log("updatedUser: ", updatedUser);
    res.status(200).json({
      message: "Congratulations.",
    });
  } catch (catchError) {
    res.status(409).json({
      message: catchError,
    });
  }
};

export { uploadUserPicture, signUp, login, getProfile, updateUser, makeLike };
