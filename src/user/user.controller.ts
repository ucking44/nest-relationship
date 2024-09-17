import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entities';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('user')
export class UserController {
    constructor( private readonly userService: UserService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async saveUser(@Res() res, @Body() createDto: CreateUserDto)
    {
        const insertUser = await this.userService.createUser(createDto)
        
        if (insertUser)
        {
            res.status(201).json({
                success: true,
                message: 'User Was Created Successfully!',
                data: insertUser
            })
        }
        else
        {
            res.status(500).json({
                success: false,
                message: 'Oooopss! Something Went Wrong...'
            })
        }
    }

    // @Get()
    // async findAll(): Promise<UserEntity[]>
    // {
    //     return await this.userService.findAll()
    // }

    @Get()
    async findAllUsers(@Res() res)
    {
        const allUsers = await this.userService.findAll()
        
        if (allUsers)
        {
            return res.status(200).json({
                success: true,
                data: allUsers
            })
        }
        else
        {
            return res.status(404).json({
                success: false,
                message: 'No User Record Was Found!'
            })
        }
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updateUser(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto)
    {
        const checkIfUserExist = await this.userService.updateUser(id, updateUserDto)

        if (checkIfUserExist.affected === 0)
        {
            res.status(404).json({
                success: false,
                message: `User With The ID Of ${ id } Does Not Exist..!`
            })
        }
        else
        {
            res.status(200).json({
                success: true,
                message: 'User Was Updated successfully!'
            })
        }
    }

    @Get('/:id')
    async fetchUserById(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const checkIfUserExist = await this.userService.fetchUserById(id)

        if (!checkIfUserExist)
        {
            res.status(404).json({
                success: false,
                message: `User With The ID Of ${ id } Does Not Exists!`
            })
        }
        else
        {
            res.status(200).json({
                success: true,
                data: checkIfUserExist
            })
        }
    }

    @Delete('/:id')
    async deleteUserById(@Res() res, @Param('id', ParseIntPipe) id: number)
    {
        const checkIfUserExist = await this.userService.fetchUserById(id)

        if (!checkIfUserExist)
        {
            res.status(404).json({
                success: false,
                message: `User With The ID Of ${ id } Does Not Exists!`
            })
        }
        else
        {
            await this.userService.deleteUserById(id)

            res.status(200).json({
                success: true,
                message: 'User Was Deleted Successfully!'
            })
        }
    }
}
