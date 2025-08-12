import pool from '../db/db';
import { Post } from '../model/PostObject';

export class PostRepository {
    async getAll(): Promise<Post[]> {
        try {
            const task = await pool.query(
                `
                SELECT * FROM posts
                ORDER BY created_at DESC;
                `
            );
            return task.rows;
        } catch (error){
            throw new Error("PostRepository -> " + error);
        }
    }

    async post(post: Post): Promise<void> {
        try {
            console.log("inside repo")
            const task = await pool.query(
            `
            INSERT INTO posts (username, content, created_at) VALUES ($1, $2, $3) RETURNING *;
            `, [post.username, post.content, post.created_at]);
        } catch (error){
            throw new Error("PostRepository -> " + error);
        }
        
    }

    async delete(id: string): Promise<void> {
        try {
            const task = await pool.query(
            `
            DELETE FROM posts WHERE id = $1;
            `, [id]);
        } catch (error){
            throw new Error("PostRepository -> " + error);
        }
    }
}