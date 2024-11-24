import { IsEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsEmpty({ message: 'the commint should not be blank' })
  body: string;
}
