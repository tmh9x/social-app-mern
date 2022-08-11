import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  birthday: {
    type: String,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    default: "User",
  },
});

const User = mongoose.model("user", usersSchema);

export default User;
