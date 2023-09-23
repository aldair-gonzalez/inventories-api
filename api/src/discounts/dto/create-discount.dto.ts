import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateDiscountDto {
  @IsNotEmpty()
  @IsString()
  discount_type: string;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  discount_amount: number;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  discount_start_date: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  discount_end_date: Date;

  @IsNotEmpty()
  @IsNumber()
  product: number;
}
