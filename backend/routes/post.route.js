import express from 'express';
import { addPost } from '../controllers/post.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const postRouter = express.Router();

// route pour ajouter un post
postRouter.post('/add-post', verifyToken, addPost);

export default postRouter;