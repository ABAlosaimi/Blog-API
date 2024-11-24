import { PartialType } from '@nestjs/mapped-types';
import { CreateArticalDto } from './create-artical.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateArticalDto extends PartialType(CreateArticalDto) {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  body: string;
}
