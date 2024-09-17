import { IsNotEmpty, IsNumber, IsOptional } from "class-validator"

enum Status {
    blocked = 'blocked',
    accepted = 'accepted',
    pending = 'pending'
}

export class UpdateFollowDto
{
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    follower_id: number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    following_id: number

    //status: Status
    status: string
}
