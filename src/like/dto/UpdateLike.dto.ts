import { IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class UpdateLikeDto
{
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    post_id: number

    type: string
}
