import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createPost, deletePost, getPosts } from '../controllers/post.js';

const router = express.Router();

router.post('/create',verifyToken,createPost);

router.get('/getposts', getPosts);

router.delete('/deletepost/:postId/:userId', verifyToken, deletePost)

export default router;