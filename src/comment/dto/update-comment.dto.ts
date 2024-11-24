import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { User } from 'src/user/entities/user.entity';
import { Artical } from 'src/articale/entities/artical.entity';
import { IsEmpty } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsEmpty({ message: 'the commint info didnt provided' })
  id: number;
  @IsEmpty({ message: 'the commint info didnt provided' })
  body: string;
  @IsEmpty({ message: 'the user info didnt provided' })
  user: User;
  @IsEmpty({ message: 'the article info didnt provided' })
  article: Artical;
}
