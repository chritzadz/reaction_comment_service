import pool from '../db/db';
import { PostHaveReplies } from '../model/PostHaveRepliesObject';

export class PostHaveRepliesRepository {
    async post(postHaveReplies: PostHaveReplies): Promise<PostHaveReplies> {
        const task = await pool.query(`
           INSERT INTO post_have_replies (post_id, reply_id) VALUES ($1, $2) RETURNING *;
           `, [postHaveReplies.post_id, postHaveReplies.reply_id]
       );

        return task.rows[0];
    }
}