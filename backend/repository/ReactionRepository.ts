import pool from '../db/db';
import { Reaction } from '../model/ReactionObject';

export class ReactionRepository {
    async getAllByReply(reply_id: string): Promise<Reaction[]> {
        const task = await pool.query(
        `
        SELECT * FROM reactions
        WHERE reply_id = $1;
        `
        , [reply_id]);

        return task.rows;
    }

    async post(reaction: Reaction): Promise<Reaction> {
        const task = await pool.query(`
            INSERT INTO reactions (username, type, reply_id) VALUES ($1, $2, $3) RETURNING *;
        `, [reaction.username, reaction.type, reaction.reply_id]);

        const log: string = `User [${reaction.username}] reacted with [${reaction.type}] to reply [${reaction.reply_id}]`; 
        const logTask = await pool.query(
            `
            INSERT INTO logs (log_text, log_type) VALUES ($1, $2);
            `, [log, 'reaction']
        )

        return task.rows[0];
    }

    async delete(reply_id: string, username: string): Promise<Reaction> {
        const task = await pool.query(`
            DELETE FROM reactions WHERE username = $1 AND reply_id = $2 RETURNING *;
        `, [username, reply_id]);

        const log: string = `User [${username}] delete reaction from reply [${reply_id}]`; 
        const logTask = await pool.query(
            `
            INSERT INTO logs (log_text, log_type) VALUES ($1, $2);
            `, [log, 'reaction']
        )

        return task.rows[0];
    }

    async alter(reply_id: String, username: String, newType: string): Promise<Reaction> {
        const task = await pool.query(
        `
        UPDATE reactions
        SET type = $1
        WHERE username = $2 AND reply_id = $3
        RETURNING *;
        `, [newType, username, reply_id]);

        const log: string = `User [${username}] update reaction to [${newType}] from reply [${reply_id}]`; 
        const logTask = await pool.query(
            `
            INSERT INTO logs (log_text, log_type) VALUES ($1, $2);
            `, [log, 'reaction']
        )

        return task.rows[0];
    }
}