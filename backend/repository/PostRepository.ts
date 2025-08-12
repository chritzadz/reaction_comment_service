import pool from '../db/db';
import { Post } from '../model/PostObject';

export class PostRepository {
    async getAll(): Promise<Post[]> {
        const task = await pool.query(
            `
            SELECT * FROM posts
            ORDER BY created_at DESC;
            `
        );
        return task.rows;
    }

    async post(post: Post): Promise<void> {
        const task = await pool.query(
        `
        INSERT INTO posts (username, content, created_at) VALUES ($1, $2, $3) RETURN *;
        `, [post.username, post.content, post.created_at]);
    }

    async delete(id: string): Promise<void> {
        const task = await pool.query(
        `
        DELETE FROM posts WHERE id = $1;
        `, [id]);
    }
}