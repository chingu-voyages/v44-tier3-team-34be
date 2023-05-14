import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema (
  {
    text: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId, ref: 'Profile'}
    },
    { timestamps: true}
)

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Meet Ups', 'Training', 'Dog Walks and Hikes', 'Photo Album', 'Other'],
    },
    comments: [commentSchema],
    author: { type: Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

export { Post }