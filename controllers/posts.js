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
    console.error('An error occured', error);
    res.status(500).json(error);
  }
};

export { create };
