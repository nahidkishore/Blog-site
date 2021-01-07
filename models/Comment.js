// post,user,body,replies

const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const User = require('./User');
const Post = require('./Post');


const commentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: Post,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },

    body: {
      type: string,
      trim: true,
      required: true,
    },
    replies: [
      {
        body: {
          type: string,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: User,
          required: true,
        },
        createdAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);
const Comment = model('Comment', commentSchema);
module.exports = Comment;