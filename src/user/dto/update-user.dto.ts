import { PartialType } from '@nestjs/mapped-types';
import { addNewAccDto } from './add-user.dto';
import { IsEmail, IsEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(addNewAccDto) {
  @IsEmpty({ message: 'Your first name shloud not be blank' })
  firstName: string;
  @IsEmpty({ message: 'Your last name shloud not be blank' })
  lastName: string;
  @IsEmpty({ message: 'Your email should not be blank' })
  @IsEmail()
  email: string;
  @IsEmpty()
  password: string;
}
