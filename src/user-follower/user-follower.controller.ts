import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserFollowerService } from './user-follower.service';
import { CreateFollowDto } from './dto/CreateFollow.dto';
import { UserService } from 'src/user/user.service';
import { UpdateFollowDto } from './dto/UpdateFollow.dto';

@Controller('user-follower')
export class UserFollowerController {
    constructor(
        private readonly followService: UserFollowerService,
        private readonly userService: UserService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async insertFollow(@Res() res, @Body() createFollowDto: CreateFollowDto)
    {
        const checkIfUserFollowerExist = await this.userService.fetchUserById(createFollowDto.follower_id)
        const checkIfUserFollowingExist = await this.userService.fetchUserById(createFollowDto.following_id)

        if(!checkIfUserFollowerExist)
        {
            return res.status(404).json({
                status: false,
                message: "User Follower Does Not Exist..!"
            })
        }
        else if(!checkIfUserFollowingExist)
        {
            return res.status(404).json({
                status: false,
                message: "User Following Does Not Exist..!"
            })
        }
        else
        {
            const saveFollow = await this.followService.createFollow(createFollowDto)

            if (saveFollow)
            {
                return res.status(201).json({
                    status: true,
                    message: "Follower And Following Was Saved Successfully!"
                })
            }
            else
            {
                return res.status(500).json({
                    status: true,
                    message: "Ooopsss! Something Went Wrong..!"
                })
            }
        }
    }

    @Get()
    async fetchAllFollowers(@Res() res)
    {
        const getAll = await this.followService.fetchFollowers()

        if(getAll.length === 0)
        {
            return res.status(404).json({
                status: false,
                message: "No Follower Or Following Record Was Found!"
            })
        }
        else
        {
            return res.status(200).json({
                status: true,
                data: getAll
            })
        }
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updateFollower(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() updateFollowDto: UpdateFollowDto)
    {
        const checkIfUserFollowerExist = await this.userService.fetchUserById(updateFollowDto.follower_id)
        const checkIfUserFollowingExist = await this.userService.fetchUserById(updateFollowDto.following_id)

        if(!checkIfUserFollowerExist)
        {
            return res.status(404).json({
                status: false,
                message: "User Follower Does Not Exist..!"
            })
        }
        else if(!checkIfUserFollowingExist)
        {
            return res.status(404).json({
                status: false,
                message: "User Following Does Not Exist..!"
            })
        }
        else
        {
            const checkIfFollowerIdExist = await this.followService.updateFollower(id, updateFollowDto)

            if(checkIfFollowerIdExist.affected === 0)
            {
                return res.status(404).json({
                    status: false,
                    message: `Follower Or Following With The ID Of ${ id } Does Exist..!`
                })
            }
            else
            {
                return res.status(200).json({
                    status: true,
                    message: "Follower...Following Was Updated Successfully!"
                })
            }
        }
    }

    @Get('/:id')
    async singleFollower(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const getSingleFollower = await this.followService.fetchSingleFollower(id)

        if(!getSingleFollower)
        {
            return res.status(404).json({
                status: false,
                message: `Follower Or Following With The ID Of ${ id } Does Exist..!`
            })
        }
        else
        {
            return res.status(200).json({
                status: true,
                data: getSingleFollower
            })
        }
    }

    @Delete('/:id')
    async deleteFollowerById(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const removeData = await this.followService.deleteFollower(id)

        if(removeData.affected === 0)
        {
            return res.status(404).json({
                status: false,
                message: `Follower Or Following With The ID Of ${ id } Does Exist..!`
            })
        }
        else
        {
            return res.status(200).json({
                status: true,
                message: "Follower...Following Was Deleted Successfully!"
            })
        }
    }
}
