import { CommentEntity } from "src/comment/comment.entities";
import { GenericEntity } from "src/generic/generic.entities";
import { LikeEntity } from "src/like/like.entity";
import { UserEntity } from "src/user/user.entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

const name = 'posts'

@Entity({ name: name })
export class PostEntity extends GenericEntity
{
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ name: 'user_id', type: 'bigint' })
    user_id: number

    @Column({ length: 50, type: 'varchar' })
    title: string

    @Column({ type: 'text' })
    body: string

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.post, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    comments: CommentEntity[]

    @OneToMany(() => LikeEntity, (like: LikeEntity) => like.post, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    likes: LikeEntity[]
}
