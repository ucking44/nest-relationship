import { GenericEntity } from "src/generic/generic.entities";
import { UserEntity } from "src/user/user.entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

enum Status {
    blocked = 'blocked',
    accepted = 'accepted',
    pending = 'pending'
}

const name = 'user_followers'

@Entity({ name: name })
export class UserFollowerEntity extends GenericEntity
{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'follower_id', type: 'bigint' })
    follower_id: number

    @Column({ name: 'following_id', type: 'bigint' })
    following_id: number

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.followers, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'follower_id' })
    followers: UserEntity[]

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.following, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'following_id' })
    following: UserEntity[]

    @Column({ enum: Status, type: 'enum', default: Status.pending })
    status: string
}
