import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  total_amount: number;

  @IsNotEmpty()
  @IsNumber()
  payment_method: number;
}
