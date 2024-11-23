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
  UseGuards,
} from '@nestjs/common';
import { ArticalService } from './artical.service';
import { CreateArticalDto } from './dto/create-artical.dto';
import { UpdateArticalDto } from './dto/update-artical.dto';
import { PaginationQueryDto } from 'pagination/pagination';
import { Public } from 'src/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('/artical')
export class ArticalController {
  constructor(private readonly articalService: ArticalService) {}

  // creating new article just for registerd users
  @Post('/new-artical/userName/:userName')
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createArticalDto: CreateArticalDto,
    @Param('userName') userName: string,
  ) {
    return await this.articalService.addNewArtical(userName, createArticalDto);
  }
  // return a list of articles for non-registed guests
  @Public()
  @HttpCode(200)
  @Get('/all')
  async findAll(@Query() query: PaginationQueryDto) {
    return await this.articalService.getArticals(query);
  }

  @Public()
  @HttpCode(200)
  @Get('/:title')
  async getArticle(@Param('title') title: string) {
    return await this.articalService.getArtical(title);
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
