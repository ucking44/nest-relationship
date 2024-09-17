import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/CreatePost.tdo';
import { UserService } from 'src/user/user.service';
import { UpdatePostDto } from './dto/UpdatePost.dto';

@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly userService: UserService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createPost(@Res() res, @Body() createDto: CreatePostDto)
    {
        const checkIfUserExist = await this.userService.fetchUserById(createDto.user_id)

        if(!checkIfUserExist)
        {
            res.status(404).json({
                success: false,
                message: 'User Does Not Exist!'
            })
        }
        else
        {
            const savePost = await this.postService.createPost(createDto)
            return res.status(201).json({
                success: true,
                message: 'Post Was Created Successfully!',
                data: savePost
            })
        }
    }

    @Get()
    async fetchPosts(@Res() res)
    {
        const allPosts = await this.postService.fetchPosts()
        
        if (allPosts.length === 0)
        {
            res.status(404).json({
                success: false,
                message: 'No Post Record Was Found!'
            })
        }
        else
        {
            res.status(200).json({
                success: false,
                data: allPosts
            })
        }
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updatePost(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto)
    {
        const checkIfUserExist = await this.userService.fetchUserById(updatePostDto.user_id)

        if(!checkIfUserExist)
        {
            return res.status(404).json({
                success: false,
                message: 'User Does Not Exist!'
            })
        }
        //else if(checkIfPostIdExist.affected === 0)
        else
        {
            const checkIfPostIdExist = await this.postService.updatePost(id, updatePostDto)
            
            if(checkIfPostIdExist.affected === 0)
            {
                return res.status(404).json({
                    success: false,
                    message: `Post With The ID Of ${ id } Does Exist!`
                })
            }
            else
            {
                return res.status(200).json({
                    success: true,
                    message: "Post Was Updated Successfully!"
                })
            }
        }
    }

    @Get('/:id')
    async fetchPostByID(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const checkIfPostIdExist = await this.postService.fetchPostById(id)

        if(!checkIfPostIdExist)
        {
            return res.status(404).json({
                success: false,
                message: `Post With The ID Of ${ id } Does Not Exist!`
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                data: checkIfPostIdExist
            })
        }
    }

    @Delete('/:id')
    async deletePostByID(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const checkIfPostIdExist = await this.postService.deletePost(id)

        if(checkIfPostIdExist.affected === 0)
        {
            return res.status(404).json({
                success: false,
                message: `Post With The ID Of ${ id } Does Not Exist!`
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                message: "Post Was Deleted Successfully!"
            })
        }
    }
}
