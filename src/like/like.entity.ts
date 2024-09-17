import { GenericEntity } from "src/generic/generic.entities";
import { PostEntity } from "src/post/post.entities";
import { UserEntity } from "src/user/user.entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

const name = 'likes'

enum Type {
    happy = 'happy',
    sad = 'sad',
    angry = 'angry',
    like = 'like',
    love = 'love'
}

@Entity({ name: name })
export class LikeEntity extends GenericEntity
{
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ name: 'user_id', type: 'bigint' })
    user_id: number

    @Column({ name: 'post_id', type: 'bigint' })
    post_id: number

    @Column({ enum: Type, type: 'enum', default: Type.like })
    type: string

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.likes, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @ManyToOne(() => PostEntity, (post: PostEntity) => post.likes, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: PostEntity
}
