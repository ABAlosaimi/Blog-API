import { IsEmpty } from 'class-validator';

export class UnfollowRequest {
  @IsEmpty({ message: 'the follower user info isnt provided' })
  followerid: number;
  @IsEmpty({ message: 'the followed user info isnt provided' })
  followedid: number;
}
