import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entities';
import { PostModule } from './post/post.module';
import { PostEntity } from './post/post.entities';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { CommentEntity } from './comment/comment.entities';
import { LikeEntity } from './like/like.entity';
import { UserFollowerModule } from './user-follower/user-follower.module';
import { UserFollowerEntity } from './user-follower/user-follower.entities';
import { IsUniqueConstraint } from './shared/validation/is-unique-constraint';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DB,
      entities: [
        UserEntity, 
        PostEntity, 
        CommentEntity, 
        LikeEntity,
        UserFollowerEntity
      ],
      synchronize: process.env.ENV === 'DEV'
    }),
    UserModule,
    PostModule,
    CommentModule,
    LikeModule,
    UserFollowerModule
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
