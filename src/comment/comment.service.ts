import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Artical } from 'src/articale/entities/artical.entity';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private commentRepo: Repository<Comment>, 
  @InjectRepository(User) private userRepo: Repository<User> , 
  @InjectRepository(Artical) private articleRepo: Repository<Artical>){}
  
  
  async create(userId: number,articaleId: number,createCommentDto: CreateCommentDto) {
   const article: Artical = await this.articleRepo.findOneBy({ id : articaleId})
   const user: User = await this.userRepo.findOneBy({id: userId})

   if(!article){
    throw new NotFoundException('the article is not exist any more')
   }

   if(!user){
    throw new NotAcceptableException('sorry you dont have the permission to comment on this article')
   }

   this.commentRepo.create({
    
   })

  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
