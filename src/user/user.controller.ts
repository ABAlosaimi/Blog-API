import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Request,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/decorators/public.decorator';
import { FollowRequest } from './dto/follow-request.dto';
import { PaginationQueryDto } from 'pagination/pagination';
import { UnfollowRequest } from './dto/unfollow-request.dto';
@Public()
@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update/')
  update(
    @Body('userName') userName: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userName, updateUserDto);
  }

  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('/follow')
  async follow(@Body() followRequest: FollowRequest) {
    // this.userService.follower(
    //   followRequest.followedid,
    //   followRequest.followerid,
    // );
    return await this.userService.follow(
      followRequest.followerid,
      followRequest.followedid,
    );
  }

  @Put('/unfollow')
  @UseGuards(AuthGuard('jwt'))
  async unfollow(@Body() unfollowReq: UnfollowRequest) {
    await this.userService.unfollow(unfollowReq);
  }

  @Get('/get-following')
  @UseGuards(AuthGuard('jwt'))
  getUserFollowing(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.userService.getFollowing(paginationQueryDto);
  }

  @Get('/get-followers')
  @UseGuards(AuthGuard('jwt'))
  getUserFollowers(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.userService.getFollowers(paginationQueryDto);
  }

  @Get('/my-profile')
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(@Request() req) {
    return await this.userService.getUserInfo(req.user);
  }
}
