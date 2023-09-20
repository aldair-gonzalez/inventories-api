import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateFinanceDto {
  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  transaction: number;
}
