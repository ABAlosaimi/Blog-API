import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  fit('should returen 200 code', () => {
    expect(service.getUser('bhbdvfd@gmail.com', 'refn34')).toBe(
      BadRequestException,
    );
  });
});
