import { IsEmpty } from 'class-validator';

export class FollowRequest {
  @IsEmpty({ message: 'the follower user info isnt provided' })
  followerid: number;
  @IsEmpty({ message: 'the followed user info isnt provided' })
  followedid: number;
}
