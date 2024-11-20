import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('/comment')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
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