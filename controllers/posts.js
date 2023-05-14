import { Profile } from "../models/profile.js";
import { Post } from "../models/post.js";

const create = async (req, res) => {
  try {
    req.body.author = req.user.Profile;
    const post = await Post.create(req.body);
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { posts: post } },
      { new: true }
    );
    post.author = profile;
    res.status(201).json(post);
  } catch (error) {
    console.error("An error occured", error);
    res.status(500).json(error);
  }
};

const index = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("author")
      .sort({ createdAt: "desc" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

const show = async(req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    .populate('author')
    .populate('comments.author')
    res.status(200).json(post)

  } catch(error) {
    res.status(500).error
  }
}

export { create, index , show};
