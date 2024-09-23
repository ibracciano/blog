import express from 'express';
import { addPost, deletePost, getPosts } from '../controllers/post.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const postRouter = express.Router();

// route pour ajouter un post
postRouter.post('/add-post', verifyToken, addPost);

// route pour recuperer tous les posts
postRouter.get('/get-posts', verifyToken, getPosts);
postRouter.post('/delete-post', verifyToken, deletePost);

export default postRouter;