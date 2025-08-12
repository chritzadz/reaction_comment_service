import { Request, Response } from 'express';
import { PostService } from '../service/PostService';

export class PostController {
    private postService: PostService;

    /*
    1. get_posts
    2. post_post
    3. delete_post
    */

    constructor() {
        this.postService = new PostService();
    }

    public async getPosts(req: Request, res: Response): Promise<void> {
        const posts = await this.postService.getAllPosts();
        res.json(posts);
    }

    public async postPost(req: Request, res: Response): Promise<void> {
        const newPost = await this.postService.postPost(req.body);
        res.status(201).json(newPost);
    }

    public async deletePost(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await this.postService.deletePost(id);
        res.status(204).send();
    }
}

