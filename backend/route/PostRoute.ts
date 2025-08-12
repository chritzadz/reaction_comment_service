import { Router } from 'express';
import { PostController } from '../controller/PostController';

const router = Router();
const controller = new PostController();
/*
1. get_posts
2. post_post
3. delete_post
*/


//GET all posts
router.get('/posts', controller.getPosts.bind(controller));

// POST /api/posts - Create new post
router.post('/posts', controller.postPost.bind(controller));

// DELETE /api/posts/:id - Delete post
router.delete('/posts/:id', controller.deletePost.bind(controller));

export { router as PostRoutes }