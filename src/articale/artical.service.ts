import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticalDto } from './dto/create-artical.dto';
import { UpdateArticalDto } from './dto/update-artical.dto';
import { Artical } from './entities/artical.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class ArticalService {
  constructor(
    @InjectRepository(Artical) private articalRepository: Repository<Artical>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
  }

  async addNewArtical(userName: string, createArticalDto: CreateArticalDto) {
    const user: User = await this.userRepository.findOneBy({
      userName: userName,
    });

    if (!user) {
      throw new NotAcceptableException(
        'Sorry you have not registerd yet to publish an article',
      );
    }

    if (
      createArticalDto.body.length == 0 ||
      createArticalDto.title.length == 0
    ) {
      throw new BadRequestException(
        'The body and title of your artical should be filled out to be published',
      );
    }

    const newArticle = this.articalRepository.create({
      body: createArticalDto.body,
      title: createArticalDto.title,
      user: user,
    });
    this.articalRepository.save(newArticle);

    return newArticle;
  }

  async getArticals(): Promise<Artical[]> {
  
  }


  async getArtical(id: number) {
    const articale: Artical = await this.articalRepository.findOneBy({
      id: id,
    });

    if (articale == null) {
      throw new NotFoundException('The artical you looking for is not exist');
    } else {
      const res = await this.articalRepository.findOneBy({ id: id });
      return res;
    }
  }

  async updateArtical(
    userId: number,
    id: number,
    updateArticalDto: UpdateArticalDto,
  ) {
    const articale: Artical = await this.articalRepository.findOneBy({
      id: id,
    });

    if (articale == null || articale.user.id != userId) {
      throw new BadRequestException(
        'The artical you want to update is not exist or you dont have the permission to edit this artical',
      );
    }
    const res = await this.articalRepository.update(id, updateArticalDto);
    return res;
  }

  async remove(id: number, userId: number): Promise<void> {
    const artical: Artical = await this.articalRepository.findOneBy({ id: id });

    if (artical == null || artical.user.id != userId) {
      throw new BadRequestException(
        'The artical you want to delete is not exist or you dont athurized to delete the artical',
      );
    } else {
      await this.articalRepository.delete(id);
    }
  }
}
