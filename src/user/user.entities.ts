import { CommentEntity } from "src/comment/comment.entities";
import { LikeEntity } from "src/like/like.entity";
import { PostEntity } from "src/post/post.entities";
import { UserFollowerEntity } from "src/user-follower/user-follower.entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Roles {
    user = 'user',
    admin = 'admin'
}

@Entity({ name: 'users' })
export class UserEntity
{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50, unique: true })
    name: string

    @Column({ type: 'varchar', nullable: true })
    about: string

    @Column({ length: 50, unique: true })
    email: string

    @Column({ type: 'enum', enum: Roles, default: Roles.user })
    role: Roles

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    public created_at: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    public updated_at: Date

    @OneToMany(() => PostEntity, (post: PostEntity) => post.user)
    posts: PostEntity[]

    @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.user, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    comments: CommentEntity[]

    @OneToMany(() => LikeEntity, (like: LikeEntity) => like.user, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    likes: LikeEntity[]

    @OneToMany(() => UserFollowerEntity, (userFollower: UserFollowerEntity) => userFollower.followers, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    followers: UserFollowerEntity[]

    @OneToMany(() => UserFollowerEntity, (userFollowing: UserFollowerEntity) => userFollowing.following, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    following: UserFollowerEntity[]

}
