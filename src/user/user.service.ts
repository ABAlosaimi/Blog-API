import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { RegisterRequestDto } from 'src/auth/dto/Register-Request.dto copy';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private uesrRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}
  // move down to authService to hash the pass and save the user account
  async addNewAcc(registerReqDto: RegisterRequestDto): Promise<void> {
    await this.uesrRepository.save(registerReqDto);
  }

  async getUesr(email: string, password: string) {
    const res = await this.authService.validateUser(email, password);
    return res;
  }
  // used by auth.service to get user object
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

  async remove(userName: string) {
    await this.uesrRepository.delete(userName);
  }
}
