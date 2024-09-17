import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { LikeService } from './like.service';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { CreateLikeDto } from './dto/CreateLike.dto';
import { UpdateLikeDto } from './dto/UpdateLike.dto';

@Controller('like')
export class LikeController {
    constructor(
        private readonly likeService: LikeService,
        private readonly userService: UserService,
        private readonly postService: PostService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async insertLike(@Res() res, @Body() createLikeDto: CreateLikeDto)
    {
        const checkIfUserExist = await this.userService.fetchUserById(createLikeDto.user_id)
        const checkIfPostExist = await this.postService.fetchPostById(createLikeDto.post_id)

        if(!checkIfUserExist)
        {
            return res.status(404).json({
                success: false,
                message: 'User Does Not Exist..!'
            })
        }
        else if(!checkIfPostExist)
        {
            return res.status(404).json({
                success: false,
                message: 'Post Does Not Exist..!'
            })
        }
        else
        {
            const saveLike = await this.likeService.createLike(createLikeDto)

            if(saveLike)
            {
                return res.status(201).json({
                    success: true,
                    message: "Like Was Save Successfully!",
                    data: saveLike
                })
            }
            else
            {
                console.log(saveLike)
                return res.status(500).json({
                    success: true,
                    message: "Ooopsss! Something Went Wrong..!"
                })
            }
        }
    }

    @Get()
    async fetchLikes(@Res() res)
    {
        const allLikes = await this.likeService.fetchLikes()
        
        if (allLikes.length === 0)
        {
            return res.status(404).json({
                success: false,
                message: 'No Like Record Was Found!'
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                data: allLikes
            })
        }
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updateLike(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() updateLikeDto: UpdateLikeDto)
    {
        const checkIfUserExist = await this.userService.fetchUserById(updateLikeDto.user_id)
        const checkIfPostExist = await this.postService.fetchPostById(updateLikeDto.post_id)

        if(!checkIfUserExist)
        {
            return res.status(404).json({
                success: false,
                message: 'User Does Not Exist..!'
            })
        }
        else if(!checkIfPostExist)
        {
            return res.status(404).json({
                success: false,
                message: 'Post Does Not Exist..!'
            })
        }
        else
        {
            const checkIfLikeIdExist = await this.likeService.updateLikeById(id, updateLikeDto)

            if(checkIfLikeIdExist.affected === 0)
            {
                return res.status(404).json({
                    success: false,
                    message: `Like With The ID Of ${ id } Does Not Exist..! `
                })
            }
            else
            {
                return res.status(200).json({
                    success: true,
                    message: "Like Was Updated Successfully!"
                })
            }
        }
    }

    @Get('/:id')
    async fetchLikeByID(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const getsingleLike = await this.likeService.fetchLikeById(id)

        if(!getsingleLike)
        {
            return res.status(404).json({
                success: false,
                message: `Like With The ID Of ${ id } Does Not Exist..! `
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                data: getsingleLike
            })
        }
    }

    @Delete('/:id')
    async destroyLike(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const deleteLike = await this.likeService.deleteLikeById(id)

        if(deleteLike.affected === 0)
        {
            return res.status(404).json({
                success: false,
                message: `Like With The ID Of ${ id } Does Not Exist..! `
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                message: "Like Was Deleted Successfully!"
            })
        }
    }
}
