import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterRequestDto } from 'src/auth/dto/Register-Request.dto copy';
import { Follow } from './entities/Follow.entity';
import { FollowingResponse } from './dto/follow-response.dto';
import { PaginationQueryDto } from 'pagination/pagination';
import { UnfollowRequest } from './dto/unfollow-request.dto';
import { faker } from '@faker-js/faker';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private uesrRepository: Repository<User>,
    @InjectRepository(Follow) private followRepo: Repository<Follow>,
  ) {}
  // used to save the account after its pass being hashed in AuthService.register
  async addNewAcc(registerReqDto: RegisterRequestDto): Promise<void> {
    await this.uesrRepository.save(registerReqDto);
  }

  // used by auth.service in registration process to check if the user exist befor or not, by the email AND userName to verify there won't be any Duplication
  async getUser(email: string, userName: string) {
    const findedByEmail = await this.uesrRepository.findOne({
      where: { email: email },
    });
    if (findedByEmail) {
      throw new BadRequestException('the email is already used');
    }

    const findedByUserName = await this.uesrRepository.findOne({
      where: { userName: userName },
    });

    if (findedByUserName) {
      throw new BadRequestException('the username is already used');
    }
  }

  async getUserInfo(userId: number) {
    return await this.uesrRepository.findOne({
      where: { id: userId },
      relations: { articals: true, comments: true, likes: true },
    });
  }

  async getUserByEmail(email: string) {
    return await this.uesrRepository.findOneBy({ email: email });
  }

  async update(userName: string, updateUserDto: UpdateUserDto) {
    const isUserExist = this.uesrRepository.findOneBy({ userName: userName });

    if (!isUserExist) {
      throw new NotFoundException('The account you looking for is not exist');
    }
    return await this.uesrRepository.update(userName, updateUserDto);
  }

  async remove(id: number) {
    await this.uesrRepository.delete(id);
  }

  // recevie the follow request and create the query then increace the folloeing for the follower
  // then increace the followers for the followed user as well at the end we gonna save this relation and send back a massege.
  async follow(
    followerid: number,
    followedId: number,
  ): Promise<FollowingResponse> {
    const follower = await this.uesrRepository.findOneBy({ id: followerid });
    const followed = await this.uesrRepository.findOneBy({ id: followedId });

    if (!followed) {
      throw new NotAcceptableException();
    }

    // check if the followed user is already followed before
    const isfollowed = await this.followRepo.findOne({
      where: { followerId: follower.id, followedId: followed.id },
    });

    //if it followed then we send backe to the follower if their wnat to unfollow or not
    if (isfollowed) {
      throw new NotAcceptableException();
    }
    const newFollowing = await this.followRepo.create({
      followerId: follower.id,
      followedId: followed.id,
    });
    // here we increment the number of following for the follower and increment the followers for the followed one
    await this.uesrRepository.increment({ id: followerid }, 'follow', 1);
    await this.uesrRepository.increment({ id: followedId }, 'followers', 1);
    this.followRepo.save(newFollowing);

    return { massege: `you have follow ${followed.firstName} successfuly` };
  }

  // unfollow a followed user
  async unfollow(unfolloeReq: UnfollowRequest) {
    const isFollowedUserActive = await this.uesrRepository.findOneBy({
      id: unfolloeReq.followedid,
    });

    if (!isFollowedUserActive) {
      throw new NotAcceptableException();
    }

    await this.followRepo.delete({
      followedId: unfolloeReq.followedid,
      followerId: unfolloeReq.followerid,
    });
    // decrement the denormalized column in  the users table
    await this.uesrRepository.decrement(
      { id: unfolloeReq.followedid },
      'followers',
      1,
    );
    await this.uesrRepository.decrement(
      { id: unfolloeReq.followerid },
      'following',
      1,
    );
  }

  async getFollowing(query: PaginationQueryDto, userName: string) {
    const user = await this.uesrRepository.findOneBy({ userName: userName });
    const { page, limit = 10 } = query;
    const [items, count] = await this.followRepo.findAndCount({
      where: { followerId: user.id },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      items,
      total: count,
      page,
      limit,
    };
  }

  async getFollowers(query: PaginationQueryDto, userName: string) {
    const user = await this.uesrRepository.findOneBy({ userName: userName });
    const { page, limit = 10 } = query;
    const [items, count] = await this.followRepo.findAndCount({
      where: { followedId: user.id },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      items,
      total: count,
      page,
      limit,
    };
  }
  // not important, it here just to fill the DB with random users to test out the query performence
  async fillUsers() {
    const chunkSize = 1_000;
    const totalUsers = 10_000;
    const users = [];

    for (let i = 0; i < totalUsers; i++) {
      const randomUserName = faker.internet.username();
      const randomEmail = faker.internet.email();
      const randompass = faker.internet.password();
      const randomFirstname = faker.person.firstName();
      const randomLastName = faker.person.lastName();

      users.push({
        userName: randomUserName,
        email: randomEmail,
        password: randompass,
        firstName: randomFirstname,
        lastName: randomLastName,
        follow: 0,
        followers: 0,
      });

      // console.log(users);

      // Insert in chunks
      if (users.length === chunkSize) {
        console.log('Inserting chunk Number:', i / chunkSize);
        console.log('Percentage done:', (i / totalUsers) * 100 + '%');
        await this.uesrRepository.save(users);
        users.length = 0; // clear the array
      }
    }

    // Insert any remaining users
    if (users.length > 0) {
      await this.uesrRepository.insert(users);
    }

    return 'done';
  }
}
