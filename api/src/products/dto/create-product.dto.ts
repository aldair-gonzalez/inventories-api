import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
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
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  quantity: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  stock_min: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  stock_max: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  sale_price: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  demand: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  initial_quantity: number;

  @IsOptional()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  final_quantity: number;

  @IsNotEmpty()
  @IsNumber()
  category: number;

  @IsNotEmpty()
  @IsNumber()
  supplier: number;
}
