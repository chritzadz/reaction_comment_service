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
            throw new Error("Error get posts");
        }
    }

    async postPost(post: Post): Promise<Post[]> {
        try {
            const task = await this.postRepository.post(post);
            const posts = await this.postRepository.getAll();
            
            return posts
        } catch (error) {
            throw new Error("Error posting post");
        }
    }

    async deletePost(id: string): Promise<Post[]> {
        try {
            const task = await this.deletePost(id);
            const posts = await this.postRepository.getAll();
            return posts
        } catch (error) {
            throw new Error("Error deleting posts");
        }
    }
}