import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './like.entity';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity]), UserModule, PostModule],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService]
})
export class LikeModule {}
