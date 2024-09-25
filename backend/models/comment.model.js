import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            ref: "Post",
            required: true,
        },
        userId: {
            type: String,
            ref: "User",
            required: true,
        },
        likes: {
            type: Array,
            default: [],
        },
        numberOfLikes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;