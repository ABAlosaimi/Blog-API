import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { User } from 'src/user/entities/user.entity';
import { Artical } from 'src/articale/entities/artical.entity';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  body: string;
  user?: User;
  article?: Artical;
}
