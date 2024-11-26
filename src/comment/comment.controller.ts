import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Public } from 'src/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PaginationQueryDto } from 'pagination/pagination';

@Controller('/comment')
@UseGuards(AuthGuard('jwt'))
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/new-comment')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Body('userId') userId: number,
    @Body('articleId') articleId: number,
  ) {
    return this.commentService.create(userId, articleId, createCommentDto);
  }

  @Get('/:id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Get('/article-commints')
  @Public()
  getArticleCommints(
    @Body() articleId: number,
    @Query() query: PaginationQueryDto,
  ) {
    return this.commentService.getArticleCommints(articleId, query);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
