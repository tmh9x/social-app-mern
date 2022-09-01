import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
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
  birthday: {
    type: Date,
    required: true,
  },
  avatarPicture: {
    type: String,
    required: false,
  },
  likes: {
    type: Array,
    required: false,
  },
});

const User = mongoose.model("user", usersSchema);

export default User;
