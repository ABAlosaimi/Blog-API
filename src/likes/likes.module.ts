import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { UserModule } from 'src/user/user.module';
import { ArticalModule } from 'src/articale/artical.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), UserModule, ArticalModule],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
