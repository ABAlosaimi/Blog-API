import { IsNotEmpty } from 'class-validator';

export class CreateArticalDto {
 @IsNotEmpty()
 title: string;
 @IsNotEmpty()
 body: string;
 @IsNotEmpty()
 userId:number;
 
}

