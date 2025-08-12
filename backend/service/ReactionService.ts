import { Reaction } from "../model/ReactionObject";
import { ReactionRepository } from "../repository/ReactionRepository";

export class ReactionService {
    private repository: ReactionRepository;

    constructor() {
        this.repository = new ReactionRepository();
    }

    async getAllByReply(reply_id: string): Promise<number[]> {
        try {
            const reactions = await this.repository.getAllByReply(reply_id);

            let reactionList = [0, 0, 0, 0, 0] // [like, love, haha, sad, angry]
            reactions.forEach(reaction => {
                switch(reaction.type) {
                    case 'like': reactionList[0] += 1; break;
                    case 'love': reactionList[1] += 1; break;
                    case 'haha': reactionList[2] += 1; break;
                    case 'sad': reactionList[3] += 1; break;
                    case 'angry': reactionList[4] += 1; break;
                }
            });

            return reactionList;
        } catch (error) {
            throw new Error("Error get reaction by reply");
        }
    }
    
    async post(reaction: Reaction): Promise<Reaction[]> {
        try {
            const task = await this.repository.post(reaction);
            const reactions = await this.repository.getAllByReply(reaction.reply_id);
            return reactions;
        } catch (error) {
            throw new Error("Error posting reaction");
        }
    }

    async delete(reaction: Reaction): Promise<Reaction[]> {
        try {
            const task = await this.repository.delete(reaction);
            const reactions = await this.repository.getAllByReply(reaction.reply_id);
            return reactions;
        } catch (error) {
            throw new Error("Error posting reaction");
        }
    }

    async alter(reaction: Reaction): Promise<Reaction> {
        try {
            const task = await this.repository.alter(reaction);
            return task;
        } catch (error) {
            throw new Error("Error posting reaction");
        }
    }

    async getUserReactionState(reply_id: string, username: string): Promise<boolean> {
        try {
            const task = await this.repository.getAllByReply(reply_id);

            if (task.length == 0){
                return false;
            }

            for (const reaction of task){
                if (reaction.username == username){
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw new Error("Error posting reaction");
        }
    }
}