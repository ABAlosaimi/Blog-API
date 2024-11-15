import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Artical } from 'src/articale/entities/artical.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Artical) private articleRepo: Repository<Artical>,
  ) {}

  async create(
    userId: number,
    articaleId: number,
    createCommentDto: CreateCommentDto,
  ) {
    const article: Artical = await this.articleRepo.findOneBy({
      id: articaleId,
    });
    const user: User = await this.userRepo.findOneBy({ id: userId });

    if (!article) {
      throw new NotFoundException('the article is not exist any more');
    }

    if (!user) {
      throw new NotAcceptableException(
        'sorry you dont have the permission to comment on this article',
      );
    }

    if (createCommentDto.body.length == 0) {
      throw new NotAcceptableException(
        'you have to say somting in your comment',
      );
    }

    const newComment = this.commentRepo.create({
      body: createCommentDto.body,
      user: user,
      article: article,
    });

    return this.commentRepo.save(newComment);
  }

  async findOne(id: number) {
    return await this.commentRepo.findOneBy({ id: id });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.commentRepo.update(id, updateCommentDto);
  }

  async remove(id: number) {
    return await this.commentRepo.delete(id);
  }
}
