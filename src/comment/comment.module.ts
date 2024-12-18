import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ArticalModule } from 'src/articale/artical.module';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule, ArticalModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [TypeOrmModule, CommentService],
})
export class CommentModule {}
