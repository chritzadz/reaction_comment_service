import { Router } from 'express';
import { PostController } from '../controller/PostController';

const router = Router();
const controller = new PostController();
/*
1. get_posts
2. post_post
3. delete_post
*/

router.get('/posts', controller.getPosts.bind(controller));

router.post('/posts', controller.postPost.bind(controller));

router.delete('/posts/:id', controller.deletePost.bind(controller));

export { router as PostRoutes }