import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const repostSchema = new Schema(
    {
        originalPost: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        repostedBy: {
            type: Schema.Types.ObjectId,
            ref: "Profile",
            required: true,
        },
        caption: {
            type: String,
            maxLength: 180,
            default: "",
        },
    },
    { timestamps: true }
);

const Repost = mongoose.model('Repost', repostSchema);

export { Repost };