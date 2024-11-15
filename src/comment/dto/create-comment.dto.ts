import { Artical } from 'src/articale/entities/artical.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateCommentDto {
  body: string;
  article: Artical;
  user: User;
}
