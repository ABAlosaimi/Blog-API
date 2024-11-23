import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { Artical } from 'src/articale/entities/artical.entity';
import { User } from 'src/user/entities/user.entity';
import { PaginationQueryDto } from 'pagination/pagination';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likesRepo: Repository<Like>,
    @InjectRepository(Artical)
    private readonly articleRepo: Repository<Artical>,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async newLike(createLikeDto: CreateLikeDto) {
    const article = await this.articleRepo.findOneBy({
      id: createLikeDto.articleId,
    });
    const user = await this.usersRepo.findOneBy({ id: createLikeDto.userId });

    if (!article) {
      throw new BadRequestException();
    }

    await this.articleRepo.increment(
      { id: createLikeDto.articleId },
      'like',
      1,
    );
    const newlike = this.likesRepo.create({
      article: article,
      user: user,
    });

    return await this.likesRepo.save(newlike);
  }

  async findAll(query: PaginationQueryDto, article: Artical) {
    const { page, limit = 10 } = query;
    const [items, count] = await this.likesRepo.findAndCount({
      where: { article: article },
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

  async remove(articalId: number, likeId: number) {
    await this.articleRepo.decrement({ id: articalId }, 'like', 1);
    await this.likesRepo.delete(likeId);
  }
}
