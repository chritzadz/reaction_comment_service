import pool from '../db/db';
import { Post } from '../model/PostObject';
import { Reply } from '../model/ReplyObject';

export class ReplyRepository {
    async getAll(): Promise<Reply[]> {
        const task = await pool.query(
            `
            SELECT * FROM replies;
            `
        );
        return task.rows;
    }

    async getById(): Promise<Reply[]> {
        const task = await pool.query(
            `
            SELECT r.username, r.id, r.content FROM replies r 
            INNER JOIN post_have_replies phr ON (r.id = phr.reply_id) 
            INNER JOIN posts p ON (p.id = phr.post_id) 
            WHERE post_id = $1;
            `
        );
        return task.rows;
    }

    async post(reply: Reply): Promise<Reply> {
        const task = await pool.query(`
           INSERT INTO replies (username, content) VALUES ($1, $2) RETURNING *;
        `, [reply.username, reply.content]);

        return task.rows[0];
    }
}