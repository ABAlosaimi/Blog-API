import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AccessToken } from './types/AccessToken.js';
import { RegisterRequestDto } from './dto/Register-Request.dto copy.js';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //used for registred user when thier wnat to login in existing account in the database
  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('The password or email isn`t right');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
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
    const existingUser = await this.userService.getUserByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('the email is already used');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };
    await this.userService.addNewAcc(newUser);
    return this.login(newUser);
  }
}
