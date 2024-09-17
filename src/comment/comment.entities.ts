import { GenericEntity } from "src/generic/generic.entities";
import { PostEntity } from "src/post/post.entities";
import { UserEntity } from "src/user/user.entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

const name = 'comments'

@Entity({ name: name })
export class CommentEntity extends GenericEntity
{
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ name: 'user_id', type: 'bigint' })
    user_id: number

    @Column({ name: 'post_id', type: 'bigint' })
    post_id: number

    @Column({ type: 'text' })
    body: string

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.comments, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @ManyToOne(() => PostEntity, (post: PostEntity) => post.comments, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: PostEntity
}
