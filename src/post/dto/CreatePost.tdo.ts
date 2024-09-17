import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreatePostDto
{
    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    body: string
}
