import { Router } from 'express';
import { ReactionController } from '../controller/ReactionController';

const router = Router();
const controller = new ReactionController();


router.get('/reactions/:reply_id', controller.getReactionsByReply.bind(controller));

router.post('/reactions', controller.postReaction.bind(controller));

router.delete('/reactions/:reply_id/:username', controller.deleteReaction.bind(controller));

router.patch('/reactions/:reply_id/:username', controller.alterReaction.bind(controller));

router.get('/reactions/:reply_id/:username', controller.getUserReactionState.bind(controller))

export { router as ReactionRoutes }