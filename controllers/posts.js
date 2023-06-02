import { Profile } from "../models/profile.js";
import { Post } from "../models/post.js";


const create = async (req, res) => {
  try {
    req.body.author = req.user.profile;
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

const show = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author")
      .populate("comments.author");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).error;
  }
};

const update = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    .populate("author");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    console.log(post, 'post')
    const profile = await Profile.findById(req.user.profile);
    console.log(profile, 'profile')
    profile.post.remove({ _id: req.params.id });
    await profile.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createComment = async (req, res) => {
  try {
    req.body.author = req.user.profile;
    const post = await Post.findById(req.params.id);
    console.log(post, "post");
    console.log(req.body);
    post.comments.push(req.body);
    await post.save();

    const newComment = post.comments[post.comments.length - 1];
    const profile = await Profile.findById(req.user.profile);
    newComment.author = profile;
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
};

//the author of the comment and the author of the post can delete a comment
const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const comment = post.comments.id(req.params.commentId);
    if (
      comment.author.equals(req.user.profile) ||
      post.author.equals(req.user.profile)
    ) {
      post.comments.remove({ _id: req.params.commentId });
      await post.save();
      res.status(200).json(comment);
    } else {
      res.status(401).json("Permission denied");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const comment = post.comments.id(req.params.commentId);
    if (comment.author.equals(req.user.profile)) {
      comment.set(req.body);
      await post.save();
      res.status(201).json(comment);
    } else {
      res.status(401).json("Permission denied");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createReaction = async (req, res) => {
  try {
    req.body.author = req.user.profile;
    const post = await Post.findById(req.params.id)
    .populate("author");
    post.reactions.push(req.body);
    await post.save();
    const newReaction = post.reactions[post.reactions.length - 1];
    const profile = await Profile.findById(req.user.profile);
    res.status(200).json(Post);
  } catch (error) {
    res.status(500).json(error);
    console.error("reaction!", error);
  }
};

const deleteReaction = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    .populate('author')
    const reaction = post.reactions.id(req.params.reactionId);

    if (!reaction) {
      return res.status(404).json({ error: "Not found" });
    }

    if (!reaction.author.equals(req.user.profile)) {
      return res.status(401).json({ error: "Permission denied" });
    }
    //uses pull to remove reaction by Id
    post.reactions.pull(req.params.reactionId);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

export {
  create,
  index,
  show,
  update,
  deletePost as delete,
  createComment,
  deleteComment,
  updateComment,
  createReaction,
  deleteReaction,
};
