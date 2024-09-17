import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdatePostDto
{
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    body: string
}
