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
import { Followers } from './entities/Followers.entity';
import { FollowingResponse } from './dto/follow-response.dto';
import { PaginationQueryDto } from 'pagination/pagination';
import { UnfollowRequest } from './dto/unfollow-request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private uesrRepository: Repository<User>,
    @InjectRepository(Follow) private followRepo: Repository<Follow>,
    @InjectRepository(Followers) private followersRepo: Repository<Followers>,
  ) {}
  // used to save the account after its pass being hashed in AuthService.register
  async addNewAcc(registerReqDto: RegisterRequestDto): Promise<void> {
    await this.uesrRepository.save(registerReqDto);
  }

  // used by auth.service in registration process to check if the user exist befor or not
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

  async getUserInfo(user: User) {
    return await this.uesrRepository.findOne({
      where: { id: user.id },
      relations: { articals: true },
    });
  }

  async getUserByEmail(email: string) {
    return await this.uesrRepository.findOne({ where: { email: email } });
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

    const newFollower = await this.followersRepo.create({
      followerid: follower.id,
      followedid: followed.id,
    });

    this.followersRepo.save(newFollower);

    return { massege: `you have follow ${followed.firstName} successfuly` };
  }

  async unfollow(unfollowReq: UnfollowRequest) {
    await this.followRepo.delete({
      followedId: unfollowReq.followedId,
      followerId: unfollowReq.followerId,
    });

    await this.followersRepo.delete({
      followedid: unfollowReq.followedId,
      followerid: unfollowReq.followerId,
    });
  }

  //  async follower(followedId: number, followerId: number) {
  //   const followedUser = await this.uesrRepository.findOneBy({
  //     id: followedId,
  //   });
  //   const follower = await this.uesrRepository.findOneBy({
  //     id: followerId,
  //   });
  //   const newFollower = this.followersRepo.create({
  //     followerid: follower.id,
  //     followedid: followedUser.id,
  //   });

  //   followedUser.followers++;
  //   follower.follow++;
  //   this.followersRepo.save(newFollower);

  //   return { massege: `you have new follower:${followedUser.firstName}` };
  // }

  async getFollowing(query: PaginationQueryDto) {
    const { page, limit = 10 } = query;
    const [items, count] = await this.followRepo.findAndCount({
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

  async getFollowers(query: PaginationQueryDto) {
    const { page, limit = 10 } = query;
    const [items, count] = await this.followersRepo.findAndCount({
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
}
