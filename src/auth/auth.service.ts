import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { AccessToken } from './types/AccessToken';
import { RegisterRequestDto } from './dto/Register-Request.dto copy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  //used for registred user when thier wnat to login in existing account in the database
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('The password or email isn`t right');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('The password or email not right');
    }
    return user;
  }

  //used to generate a JWT token for new user
  async login(user: RegisterRequestDto): Promise<AccessToken> {
    const payload = { email: user.email, id: user.id, userName: user.userName };
    return { access_token: this.jwtService.sign(payload) };
  }

  // used in sign in (new account in userService) but befor registration it hashing the account's password, to be saved then in the database
  async register(user: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (existingUser) {
      throw new BadRequestException('the email is already used');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);
    return this.login(newUser);
  }
}
