import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ArticalService } from './artical.service';
import { CreateArticalDto } from './dto/create-artical.dto';
import { UpdateArticalDto } from './dto/update-artical.dto';
import { GenericFilter } from 'pagination/genericFilter';
import { Artical } from './entities/artical.entity';

@Controller('/artical')
export class ArticalController {
  constructor(private readonly articalService: ArticalService) {}

  // creating new article just for registerd users
  @Post('/new-artical/userName/:userName')
  @HttpCode(201)
  async create(
    @Body() createArticalDto: CreateArticalDto,
    @Param('userName') userName: string,
  ) {
    return await this.articalService.addNewArtical(userName, createArticalDto);
  }
  // return a list of articles for non-registed guests
  @HttpCode(200)
  @Get('/all')
  async findAll(@Query() filter: GenericFilter & Artical) {
    return await this.articalService.getArticals(filter);
  }
  @HttpCode(200)
  @Get('/:id')
  async getArticle(@Param('id') id: string) {
    return await this.articalService.getArtical(+id);
  }

  @HttpCode(201)
  @Patch('/update/:id/userId/:userId')
  async update(
    @Param('userId') userId: number,
    @Param('id') id: number,
    @Body() updateArticalDto: UpdateArticalDto,
  ) {
    return await this.articalService.updateArtical(
      userId,
      id,
      updateArticalDto,
    );
  }

  @Delete('/delete/:id/userId/:userId')
  async remove(@Param('id') id: string, @Param('userId') userId: number) {
    await this.articalService.remove(+id, userId);
    return HttpStatus.NO_CONTENT;
  }
}
