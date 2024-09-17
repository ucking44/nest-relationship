import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from './like.entity';
import { Repository } from 'typeorm';
import { CreateLikeParams, UpdateLikeParams } from 'src/utils/like/types';

@Injectable()
export class LikeService {
    constructor(@InjectRepository(LikeEntity) private readonly likeRepo: Repository<LikeEntity>) {}

    async createLike(createLikeParams: CreateLikeParams)
    {
        const saveLike = await this.likeRepo.create(createLikeParams)
        const result = await this.likeRepo.save(saveLike)
        return result
    }

    async fetchLikes()
    {
        const allLikes = await this.likeRepo.find({ relations: ['user', 'post'] })
        return allLikes
    }

    async updateLikeById(id: number, updateLikeParams: UpdateLikeParams)
    {
        const updateLike = await this.likeRepo.update(id, updateLikeParams)
        return updateLike
    }

    async fetchLikeById(id: number)
    {
        const singleLike = await this.likeRepo.findOne({ where: { id: id } })
        return singleLike
    }

    async deleteLikeById(id: number)
    {
        const deleteLike = await this.likeRepo.delete(id)
        return deleteLike
    }
}
