import { Reply } from "../model/ReplyObject";
import { PostHaveReplies } from "../model/PostHaveRepliesObject";
import { PostHaveRepliesRepository } from "../repository/PostHaveRepliesRepository";
import { ReplyRepository } from "../repository/ReplyRepository";

class PostHaveRepliesObject implements PostHaveReplies{
    post_id: string;
    reply_id: string;

    constructor(post_id: string, reply_id: string){
        this.post_id = post_id;
        this.reply_id = reply_id;
    }
}

export class ReplyService {
    private repository: ReplyRepository;
    private linker: PostHaveRepliesRepository;

    constructor() {
        this.repository = new ReplyRepository();
        this.linker = new PostHaveRepliesRepository();
    }

    async getAllReplies(): Promise<Reply[]> {
        try {
            const replies = await this.repository.getAll();
            return replies
        } catch (error) {
            throw new Error("Error get all replies");
        }
    }

    async getRepliesByPost(post_id: string): Promise<Reply[]> {
        try {
            const replies = await this.repository.getAll();
            return replies
        } catch (error) {
            throw new Error("Error get all replies");
        }
    }

    async postReply(reply: Reply, post_id: string): Promise<Reply[]> {
        try {
            const task = await this.repository.post(reply);

            const postHaveReplies = new PostHaveRepliesObject(post_id, task.id);

            const task1 = await this.linker.post(postHaveReplies);
            const replies = await this.repository.getAll();
            
            return replies;
        } catch (error) {
            throw new Error("Error posting post");
        }
    }
}