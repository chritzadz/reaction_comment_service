import { Post } from "../model/PostObject";
import { PostRepository } from "../repository/PostRepository";

export class PostService {
    private postRepository: PostRepository;

    constructor() {
        this.postRepository = new PostRepository();
    }

    async getAllPosts(): Promise<Post[]> {
        try {
            const posts = await this.postRepository.getAll();
            return posts
        } catch (error) {
            throw new Error("PostService -> " + error);
        }
    }       

    async postPost(post: Post): Promise<Post[]> {
        try {
            //date conversion to SQL syntax
            const now = new Date();
            post.created_at = now.toISOString();

            const task = await this.postRepository.post(post);
            const posts = await this.postRepository.getAll();
            return posts
        } catch (error) {
            throw new Error("PostService -> " + error);
        }
    }

    async deletePost(id: string): Promise<Post[]> {
        try {
            const task = await this.postRepository.delete(id);
            const posts = await this.postRepository.getAll();
            return posts
        } catch (error) {
            throw new Error("PostService -> " + error);
        }
    }
}