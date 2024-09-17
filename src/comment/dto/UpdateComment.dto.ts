import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateCommentDto
{
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    post_id: number

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    body: string
}
