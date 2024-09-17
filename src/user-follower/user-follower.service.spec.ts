import { Test, TestingModule } from '@nestjs/testing';
import { UserFollowerEntityService } from './user-follower.service';

describe('UserFollowerEntityService', () => {
  let service: UserFollowerEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFollowerEntityService],
    }).compile();

    service = module.get<UserFollowerEntityService>(UserFollowerEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
