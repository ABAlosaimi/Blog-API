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
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterRequestDto } from 'src/auth/dto/Register-Request.dto copy';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @HttpCode(201)
  @Post('/sign-in')
  registerNewAcc(@Body() registerReq: RegisterRequestDto) {
    return this.authService.register(registerReq);
  }

  @HttpCode(200)
  @Get('/login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.getUesr(email, password);
  }
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update/:userName')
  update(@Param('userName') userName: string, @Body() updateUserDto: UpdateUserDto) {

    return this.userService.update(userName, updateUserDto);
  }
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  remove(@Param('userName') userName: string) {
    return this.userService.remove(userName);
  }
}
