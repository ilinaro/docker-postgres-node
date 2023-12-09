import { Router } from 'express';
import postController from '../controller/post.controller';

const router = Router();

router.post('/post', postController.createPost);
router.get('/post', postController.getPostByUser);

export default router;
