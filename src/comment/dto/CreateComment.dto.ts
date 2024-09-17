import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto
{
    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @IsNotEmpty()
    @IsNumber()
    post_id: number

    @IsNotEmpty()
    @IsString()
    body: string
}
