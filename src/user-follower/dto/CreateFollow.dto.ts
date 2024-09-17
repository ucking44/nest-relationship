import { IsNotEmpty, IsNumber } from "class-validator"

enum Status {
    blocked = 'blocked',
    accepted = 'accepted',
    pending = 'pending'
}

export class CreateFollowDto
{
    @IsNotEmpty()
    @IsNumber()
    follower_id: number

    @IsNotEmpty()
    @IsNumber()
    following_id: number

    //status: Status
    status: string
}
