// import { IsNumber } from 'class-validator';
// import { IsOptional } from 'class-validator';
// import { IsEnum } from 'class-validator';
// import { Type } from 'class-transformer';
// import { SortOrder } from './sortOrder';

// export class GenericFilter {
//   @Type(() => Number)
//   @IsNumber({}, { message: ' "page" atrribute should be a number' })
//   public page: number;

//   @Type(() => Number)
//   @IsNumber({}, { message: ' "pageSize" attribute should be a number ' })
//   public pageSize: number;

//   @IsOptional()
//   public orderBy?: string;

//   @IsEnum(SortOrder)
//   @IsOptional()
//   public sortOrder?: SortOrder = SortOrder.DESC;
// }
