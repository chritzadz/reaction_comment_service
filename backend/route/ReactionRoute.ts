import { Router } from 'express';
import { ReactionController } from '../controller/ReactionController';

const router = Router();
const controller = new ReactionController();


router.get('/posts/:reply_id', controller.getReactionsByReply.bind(controller));

router.post('/posts', controller.postReaction.bind(controller));

router.delete('/posts/:id', controller.deleteReaction.bind(controller));

router.patch('posts', controller.alterReaction.bind(controller));

export { router as PostRoutes }