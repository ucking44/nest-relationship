import { IsEmail, IsNotEmpty, IsOptional } from "class-validator"
import { Roles } from "../user.entities"
import { IsUnique } from "src/shared/validation/is-unique"

const name = 'users'

export class UpdateUserDto
{
    @IsUnique({ tableName: name, column: 'name', message: 'Name Already Exists' })
    @IsOptional()
    @IsNotEmpty({ message: 'Name is required!' })
    name: string

    @IsOptional()
    about: string

    @IsUnique({ tableName: name, column: 'email', message: 'Email Already Exists' })
    @IsOptional()
    @IsEmail()
    @IsNotEmpty({ message: 'Email is required!' })
    email: string

    role: Roles
}
