import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFinanceDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  transaction: number;
}
