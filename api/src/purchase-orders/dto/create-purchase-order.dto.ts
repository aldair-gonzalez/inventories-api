import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreatePurchaseOrderDto {
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  delivery_date: Date;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  total_amount: number;

  @IsNotEmpty()
  @IsNumber()
  supplier: number;

  @IsNotEmpty()
  @IsNumber()
  order_status: number;
}
