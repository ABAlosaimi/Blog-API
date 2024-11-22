import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Follow } from './entities/Follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Follow])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
