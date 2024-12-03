import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { Follow } from './entities/Follow.entity';

describe('UsersController', () => {
  let userController: UserController;

  // Mocking UserService functions to run it in full isolation from the app
  // that will guarantee for us a full control of mocking these functions and then test it out
  // without thinking of the rest of the app process
  const mockUsersService = {
    addNewAcc: jest.fn(),
    getUser: jest.fn(),
    getUserInfo: jest.fn(),
    update: jest.fn(),
    follow: jest.fn(),
    unfollow: jest.fn(),
    getFollowers: jest.fn(),
    getUserFollowing: jest.fn(),
    getUserByEmail: jest.fn(),
    getFollowing: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  // testing follow function
  describe('follow a user account', () => {
    it('should successfully follow a user account', async () => {
      const result = { message: 'User followed successfully' };
      mockUsersService.follow.mockResolvedValue(result);

      const payload = { followerid: 6, followedid: 8 };
      expect(await userController.follow(payload)).toEqual(result);
    });
  });

  //testing the pagination involvoed in the getUserFollowers function
  describe('getUserFollowers', () => {
    it('should return followers of a user in pagination', async () => {
      let items: Follow[];
      const result = { items, total: 3, page: 2, limit: 10 };
      mockUsersService.getFollowers.mockResolvedValue(result);

      expect(await userController.getUserFollowers(result, 'refn34')).toEqual(
        result,
      );
    });
  });

  // testing the pagination of getUserFollowing
  describe('getUserFollowing', () => {
    it('should return following of a user in pagination', async () => {
      let items: Follow[];
      const result = { items, total: 3, page: 2, limit: 10 };
      mockUsersService.getUserFollowing.mockResolvedValue(result);

      expect(await userController.getUserFollowing(result, 'refn34')).toEqual(
        result,
      );
    });
  });

  // testing the getMyprofile function
  describe('getMyProfile', () => {
    it('should return current user profile with their info', async () => {
      const results = {
        id: 4,
        username: 'refn34',
        firstName: 'abdulrahamn',
        lastName: 'alosaimi',
        email: 'decbds@gmail.com',
        follow: 0,
        followers: 0,
        articles: [],
        commints: [],
        likes: [],
      };

      expect(await userController.getUserProfile(results.id)).toEqual(results);
    });
  });

  // testing unfollow function where the function move down for the follow table and the denormalized column in the users table
  describe('unfollowAcc', () => {
    it('should successfully unfollow a user', async () => {
      const result = { message: 'Unfollowed successfully' };
      mockUsersService.unfollow.mockResolvedValue(result);

      const payload = { followerid: 5, followedid: 6 };
      expect(await userController.unfollow(payload)).toEqual(result);
    });
  });
});
