import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  slug: string;
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
