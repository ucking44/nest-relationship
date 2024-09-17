import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFollowerEntity } from './user-follower.entities';
import { Repository } from 'typeorm';
import { CreateFollowParams, UpdateFollowParams } from 'src/utils/follow/types';

@Injectable()
export class UserFollowerService {
    constructor(@InjectRepository(UserFollowerEntity) private readonly followRepo: Repository<UserFollowerEntity>) {}

    async createFollow(createFollowParams: CreateFollowParams)
    {
        const saveFollow = this.followRepo.create(createFollowParams)
        const result = await this.followRepo.save(saveFollow)
        return result
    }

    async fetchFollowers()
    {
        const allFollowers = await this.followRepo.find({ relations: ['followers', 'following']})
        return allFollowers
    }

    async updateFollower(id: number, updateFollowParams: UpdateFollowParams)
    {
        const updateById = await this.followRepo.update(id, updateFollowParams)
        return updateById
    }

    async fetchSingleFollower(id: number)
    {
        const singleFollower = await this.followRepo.findOne({ where: { id: id }, relations: ['followers', 'following'] })
        return singleFollower
    }

    async deleteFollower(id: number)
    {
        const deleteById = await this.followRepo.delete(id)
        return deleteById
    }
}
