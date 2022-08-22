import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import usersModel from "../models/usersModel.js";

const uploadUserPicture = async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "social-app-mern",
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
    email: req.body.email,
    birthday: req.body.birthday,
    avatarPicture: req.body.avatarPicture,
  });
  try {
    const existingUser = await usersModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ message: "user already exists" });
    } else {
      const hashedPassword = await encryptPassword(req.body.password);

      const newUser = new usersModel({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        birthday: req.body.birthday,
        avatarPicture: req.body.avatarPicture,
      });

      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          user: {
            userName: savedUser.userName,
            email: savedUser.email,
            birthday: savedUser.birthday,
            avatarPicture: savedUser.avatarPicture,
          },
          msg: "User Registered successfully",
        });
      } catch (error) {
        res
          .status(409)
          .json({ message: "error while saving new user", error: error });
      }
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: "registration not possible", error: error });
  }
};

export { uploadUserPicture, signUp };
