import { Request, Response } from 'express';
import { ReactionService } from '../service/ReactionService';

export class ReactionController {
    private service: ReactionService;

    /*
    1. post_reaction
    2. get_reactionList per reply
    3. delete_reaction
    */
    constructor() {
        this.service = new ReactionService();
    }

    public async postReaction(req: Request, res: Response): Promise<void> {
        const reactions = await this.service.post(req.body);
        res.status(201).json(reactions);
    }

    public async getReactionsByReply(req: Request, res: Response): Promise<void> {
        const { reply_id } = req.params;
        const reactions = await this.service.getAllByReply(reply_id);
        res.status(201).json(reactions);
    }

    public async deleteReaction(req: Request, res: Response): Promise<void> {
        const reactions = await this.service.delete(req.body);
        res.status(201).json(reactions);
    }

    public async alterReaction(req: Request, res: Response): Promise<void> {
        const reactions = await this.service.alter(req.body);
        res.status(201).json(reactions);
    }

    public async getUserReactionState(req: Request, res: Response): Promise<void> {
        const { reply_id, username } = req.body;
        const reaction = await this.service.getUserReactionState(reply_id, username);
    }
}

