import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/CreateComment.dto';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { UpdateCommentParams } from 'src/utils/comment/types';

@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        private readonly userService: UserService,
        private readonly postService: PostService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async insertComment(@Res() res, @Body() createDto: CreateCommentDto)
    {
        const checkIfUserExist = await this.userService.fetchUserById(createDto.user_id)
        const checkIfPostExist = await this.postService.fetchPostById(createDto.post_id)

        if (!checkIfUserExist)
        {
            return res.status(404).json({
                success: false,
                message: 'User Does Not Exist!'
            })
        }
        else if (!checkIfPostExist)
        {
            return res.status(404).json({
                success: false,
                message: 'Post Does Not Exist!'
            })
        }
        else
        {
            const saveComment = await this.commentService.createComment(createDto)

            if(!saveComment)
            {
                return res.status(500).json({
                    success: false,
                    message: 'Oooopsss! Something Went Wrong'
                })
            }
            else
            {
                return res.status(201).json({
                    success: true,
                    message: 'Comment Was Save Successfully!',
                    data: saveComment
                })
            }
        }
    }

    @Get()
    async fetchAllComments(@Res() res)
    {
        const allComments = await this.commentService.fetchComments()

        if(allComments.length === 0)
        {
            return res.status(404).json({
                success: false,
                message: 'No Comment Record Was Found..!'
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                data: allComments
            })
        }
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updateCommentById(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() updateCommentParams: UpdateCommentParams)
    {
        const checkIfUserExist = await this.userService.fetchUserById(updateCommentParams.user_id)
        const checkIfPostExist = await this.postService.fetchPostById(updateCommentParams.post_id)

        if (!checkIfUserExist)
        {
            return res.status(404).json({
                success: false,
                message: 'User Does Not Exist!'
            })
        }
        else if (!checkIfPostExist)
        {
            return res.status(404).json({
                success: false,
                message: 'Post Does Not Exist!'
            })
        }
        else
        {
            const checkIfCommentExist = await this.commentService.updateComment(id, updateCommentParams)

            if (checkIfCommentExist.affected === 0)
            {
                return res.status(404).json({
                    success: false,
                    message: `Comment With The ID Of ${ id } Does Exist`
                })
            }
            else
            {
                return res.status(200).json({
                    success: true,
                    message: 'Comment Was Updated Successfully!'
                })
            }
        }
    }

    @Get('/:id')
    async fetchSingleComment(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const getSingleComment = await this.commentService.fetchCommentById(id)

        if(!getSingleComment)
        {
            return res.status(404).json({
                success: false,
                message: `Comment With The ID Of ${ id } Does Exist`
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                data: getSingleComment
            })
        }
    }

    @Delete('/:id')
    async deleteCommentById(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const destroyComment = await this.commentService.deleteComment(id)

        if(destroyComment.affected === 0)
        {
            return res.status(404).json({
                success: false,
                message: `Comment With The ID Of ${ id } Does Exist`
            })
        }
        else
        {
            return res.status(200).json({
                success: false,
                message: `Comment With The ID Of ${ id } Deleted Successfully!`
            })
        }
    }
}
