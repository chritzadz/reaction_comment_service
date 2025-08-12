import { Router } from 'express';
import { ReplyController } from '../controller/ReplyController';

const router = Router();
const controller = new ReplyController();
/*
1. get_replies
2. post_reply
*/

router.get('/replies', controller.getReplies.bind(controller));
router.get('/replies/:post_id', controller.getRepliesByPost.bind(controller));
router.post('/replies/:post_id', controller.postReply.bind(controller));

export { router as ReplyRoutes }