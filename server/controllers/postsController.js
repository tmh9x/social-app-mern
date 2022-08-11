import Post from "../models/postsModel.js";

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({});

    console.log("allPosts", allPosts);
    res.status(200).json({
      allPosts,
      number: allPosts.length,
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

export { getAllPosts };
