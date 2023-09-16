import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  product_code: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  unit_measure: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  stock_min: number;

  @IsNotEmpty()
  @IsNumber()
  stock_max: number;

  @IsNotEmpty()
  @IsNumber()
  sale_price: number;

  @IsNotEmpty()
  @IsNumber()
  demand: number;

  @IsNotEmpty()
  @IsNumber()
  initial_quantity: number;

  @IsNotEmpty()
  @IsNumber()
  final_quantity: number;

  @IsNotEmpty()
  @IsNumber()
  category: number;

  @IsNotEmpty()
  @IsNumber()
  vendor: number;
}
