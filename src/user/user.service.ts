import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entities';
import { Repository } from 'typeorm';
import { CreateUserParams, UpdateUserParams } from 'src/utils/user/types';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {}

    async createUser(createUserParams: CreateUserParams)
    {
        const saveUser = await this.userRepo.create(createUserParams)
        const insertUser = await this.userRepo.save(saveUser)
        return insertUser
    }

    findAll(): Promise<UserEntity[]> 
    {
        return this.userRepo.find()
    }

    async updateUser(id: number, updateUserParams: UpdateUserParams)
    {
        const userUpdate = await this.userRepo.update(id, updateUserParams)
        return userUpdate
    }
    
    async fetchUserById(id: number)
    {
        const userById = await this.userRepo.findOne({ where: { id: id } })
        return userById
    }

    async deleteUserById(id: number)
    {
        const userById = await this.userRepo.findOne({ where: { id: id } })
        const deleteUserById = await this.userRepo.remove(userById)
        return deleteUserById
    }
}
