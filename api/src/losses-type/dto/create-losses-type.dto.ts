import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLossesTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
