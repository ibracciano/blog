import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },

    author: {
        type: String,
        ref: 'User',
    },

    image: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        default: "Uncategorized"

    },

    slug: {
        type: String,
    },

}, { timestamps: true });

const Post = mongoose.model('Post', postSchema)

export default Post;
