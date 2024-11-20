import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginResponseDTO } from './dto/login-Response';
import { RegisterRequestDto } from './dto/Register-Request.dto copy';
import { RegisterResponseDTO } from './dto/Register-Response.dto';
import { Public } from 'src/decorators/public.decorator';

@Public()
@Controller('/auth-user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<LoginResponseDTO | BadRequestException> {
    return this.authService.validateUser(email, password);
  }

  @Post('/register')
  async register(
    @Body() registerBody: RegisterRequestDto,
  ): Promise<RegisterResponseDTO | BadRequestException> {
    return await this.authService.register(registerBody);
  }
}
