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
            INSERT INTO reactions (username, type, reply_id) VALUES ($1, $2, $3) RETURN *;
        `, [reaction.username, reaction.type, reaction.reply_id]);

        return task.rows[0];
    }

    async delete(reaction: Reaction): Promise<Reaction> {
        const task = await pool.query(`
            DELETE FROM reactions WHERE username = $1 AND reply_id = $2 RETURN *;
        `, [reaction.username, reaction.reply_id]);

        return task.rows[0];
    }

    async alter(reaction: Reaction): Promise<Reaction> {
        const task = await pool.query(
        `
        UPDATE reactions
        SET type = $1
        WHERE username = $2 AND reply_id = $3
        RETURN *;
        `, [reaction.type, reaction.username, reaction.reply_id]);

        return task.rows[0];
    }
}