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
import { Comment } from './entities/comment.entity';
import { PaginationQueryDto } from 'pagination/pagination';

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
  // get the commints on one article by paginate it
  async getArticleCommints(articleId: number, query: PaginationQueryDto) {
    const articale = await this.articleRepo.findOneBy({ id: articleId });

    if (!articale) {
      throw new NotFoundException(
        'the article is not published any more or being deleted ',
      );
    }

    const { page, limit = 10 } = query;
    const [items, count] = await this.commentRepo.findAndCount({
      where: { article: articale },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      items,
      total: count,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const isExist = await this.commentRepo.findOneBy({ id: id });
    if (!isExist) {
      throw new NotFoundException('the commint you looking for may deleted');
    }
    return isExist;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.commentRepo.update(id, updateCommentDto);
  }

  async remove(id: number) {
    return await this.commentRepo.delete(id);
  }
}
