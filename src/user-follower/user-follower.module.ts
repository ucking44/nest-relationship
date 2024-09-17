import { Module } from '@nestjs/common';
import { UserFollowerController } from './user-follower.controller';
import { UserFollowerService } from './user-follower.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFollowerEntity } from './user-follower.entities';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserFollowerEntity]), UserModule],
  controllers: [UserFollowerController],
  providers: [UserFollowerService],
  exports: [UserFollowerService]
})
export class UserFollowerModule {}
