import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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
  @IsNumber()
  total_amount: number;

  @IsNotEmpty()
  @IsNumber()
  supplier: number;

  @IsNotEmpty()
  @IsNumber()
  order_status: number;
}
