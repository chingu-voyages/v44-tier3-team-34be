import { Post } from "../models/post.js";
import { Profile } from "../models/profile.js";
import { Repost } from "../models/repost.js";

const repost = async (req, res) => {
    try {
        // Find the original post by its ID
        const originalPost = await Post.findById(req.body.postId);

        // Create a new repost with the original post and the current user's profile
        const repost = await Repost.create({
            originalPost: originalPost,
            repostedBy: req.user.profile,
            caption: req.body.caption,
        });

        // Add the repost to the current user's profile
        const profile = await Profile.findByIdAndUpdate(
            req.user.profile,
            { $push: { reposts: repost } },
            { new: true }
        );

        res.status(201).json(repost);
    } catch (error) {
        console.error("An error occurred", error);
        res.status(500).json(error);
    }
};



export {
    repost,
}