import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { Public } from 'src/decorators/public.decorator';
import { PaginationQueryDto } from 'pagination/pagination';
import { Artical } from 'src/articale/entities/artical.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('/likes')
@UseGuards(AuthGuard('jwt'))
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('/new-like')
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.newLike(createLikeDto);
  }

  @Public()
  @Get('/all')
  findAll(@Query() query: PaginationQueryDto, @Body() article: Artical) {
    return this.likesService.findAll(query, article);
  }

  @Delete('/unlike')
  remove(@Body('articleId') articleId: number, @Body('likeId') likeId: number) {
    return this.likesService.remove(articleId, likeId);
  }
}
