import { Test, TestingModule } from '@nestjs/testing';
import { UserFollowerEntityController } from './user-follower.controller';

describe('UserFollowerEntityController', () => {
  let controller: UserFollowerEntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFollowerEntityController],
    }).compile();

    controller = module.get<UserFollowerEntityController>(UserFollowerEntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
