import { IsEmail, IsEmpty } from 'class-validator';

export class addNewAccDto {
  @IsEmpty({ message: 'You have to set a username for your account' })
  userName: string;
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
