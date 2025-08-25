import { Router } from 'express';
import { LogController } from '../controller/LogController';

const router = Router();
const controller = new LogController();
/*
1. get_posts
2. post_post
3. delete_post
*/

router.get('/logs/reaction', controller.getReactionLogs.bind(controller));

export { router as LogRoutes }