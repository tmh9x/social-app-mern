import User from "../models/usersModel.js";

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});

    console.log("allUsers", allUsers);
    res.status(200).json({
      allUsers,
      number: allUsers.length,
    });
  } catch (error) {
    if (error === "xyz") {
      res.status(500).json({
        error: error,
        msg: "wrong url",
      });
    }

    res.status(500).json({
      error: error,
      msg: "server failed",
    });
  }
};

export { getAllUsers };
