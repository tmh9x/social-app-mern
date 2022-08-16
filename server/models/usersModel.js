import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarPicture: {
    type: String,
  },
});

const User = mongoose.model("user", usersSchema);

export default User;
