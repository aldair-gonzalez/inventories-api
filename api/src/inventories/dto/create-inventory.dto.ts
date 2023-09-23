import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  unit_cost: number;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  purchase_date: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  expiration_date: Date;

  @IsNotEmpty()
  @IsNumber()
  product: number;

  @IsNotEmpty()
  @IsNumber()
  purchase_order: number;

  @IsOptional()
  @IsNumber()
  lot: number;
}
