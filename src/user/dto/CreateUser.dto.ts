import { IsEmail, IsNotEmpty, IsOptional, Validate } from "class-validator"
import { Roles } from "../user.entities"
import { IsUnique } from "src/shared/validation/is-unique"
import { IsUniqueConstraint } from "src/shared/validation/is-unique-constraint"

const name = 'users'

export class CreateUserDto
{
    //@Validate(IsUniqueConstraint)
    @IsUnique({ tableName: name, column: 'name', message: 'Name Already Exists' })
    @IsNotEmpty({ message: 'Name is required!' })
    name: string

    @IsOptional()
    about: string

    @IsUnique({ tableName: name, column: 'email', message: 'Email Alread Exists' })
    @IsEmail()
    @IsNotEmpty({ message: 'Email is required!' })
    email: string

    role: Roles
}
