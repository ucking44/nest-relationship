import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entities';
import { Repository } from 'typeorm';
import { CreateCommentParams, UpdateCommentParams } from 'src/utils/comment/types';

@Injectable()
export class CommentService {
    constructor(@InjectRepository(CommentEntity) private readonly commentRepo: Repository<CommentEntity>) {}
    
    async createComment(createCommentParams: CreateCommentParams)
    {
        const saveComment = await this.commentRepo.create(createCommentParams)
        const result = await this.commentRepo.save(saveComment)
        return result
    }

    async fetchComments()
    {
        const getAllComments = await this.commentRepo.find({ relations: ['user', 'post'] })
        return getAllComments
    }

    async updateComment(id: number, updateCommentParams: UpdateCommentParams)
    {
        const updateCommentById = await this.commentRepo.update(id, updateCommentParams)
        return updateCommentById
    }

    async fetchCommentById(id: number)
    {
        const getCommentById = await this.commentRepo.findOne({ where: { id: id } })
        return getCommentById
    }

    async deleteComment(id: number)
    {
        const deleteCommentById = await this.commentRepo.delete(id)
        return deleteCommentById
    }
}
