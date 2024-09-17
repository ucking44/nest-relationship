import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entities';
import { Repository } from 'typeorm';
import { CreatePostParams, UpdatePostParams } from 'src/utils/post/types';

@Injectable()
export class PostService {
    constructor(@InjectRepository(PostEntity) private readonly postRepo: Repository<PostEntity>) {}
    
    async createPost(createPostParams: CreatePostParams)
    {
        const insertPost = await this.postRepo.create(createPostParams)
        const savePost = await this.postRepo.save(insertPost)
        return savePost
    }

    async fetchPosts()
    {
        const allPosts = await this.postRepo.find({ relations: ['user'] })
        return allPosts
    }

    async updatePost(id: number, updatePostParams: UpdatePostParams)
    {
        const updatingPost = await this.postRepo.update(id, updatePostParams)
        return updatingPost
    }

    async fetchPostById(id: number)
    {
        const getPostById = await this.postRepo.findOne({ where: { id: id } })
        return getPostById
    }

    async deletePost(id: number)
    {
        // const postId = await this.postRepo.findOne({ where: { id: id } })
        const deletePost = await this.postRepo.delete(id)
        return deletePost
    }
}
