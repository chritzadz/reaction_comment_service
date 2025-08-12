import { Request, Response } from 'express';
import { ReplyService } from '../service/ReplyService';

export class ReplyController {
    private service: ReplyService;

    /*
    1. get_replies
    2. post_reply
    */

    constructor() {
        this.service = new ReplyService();
    }

    public async getReplies(req: Request, res: Response): Promise<void> {
        const replies = await this.service.getAllReplies();
        res.json(replies);
    }

    public async getRepliesByPost(req: Request, res: Response): Promise<void> {
        const { post_id } = req.params;
        const replies = await this.service.getRepliesByPost(post_id);
        res.json(replies);
    }

    public async postReply(req: Request, res: Response): Promise<void> {
        const { post_id } = req.params;
        const replies = await this.service.postReply(req.body, post_id);
        res.status(201).json(replies);
    }
}
