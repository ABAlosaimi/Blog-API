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
  BadRequestException,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterRequestDto } from 'src/auth/dto/Register-Request.dto copy';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { RegisterResponseDTO } from 'src/auth/dto/Register-Response.dto';
import { LoginResponseDTO } from 'src/auth/dto/login-Response';
import { Public } from 'src/decorators/public.decorator';
@Public()
@Controller('/user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Public()
  @HttpCode(201)
  @Post('/sign-in')
  registerNewAcc(
    @Body() registerReq: RegisterRequestDto,
  ): Promise<RegisterResponseDTO | BadRequestException> {
    return this.authService.register(registerReq);
  }
  @Public()
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Get('/login')
  login(@Request() req): Promise<LoginResponseDTO | BadRequestException> {
    return this.authService.login(req.user);
  }

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
}
