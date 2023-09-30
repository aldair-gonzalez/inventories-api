import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  product_code: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  unit_measure: string;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  @ApiProperty()
  stock_min: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  @ApiProperty()
  stock_max: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  @ApiProperty()
  sale_price: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  @ApiProperty()
  demand: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  @ApiProperty()
  initial_quantity: number;

  @IsOptional()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  @ApiProperty()
  final_quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  category: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  supplier: number;
}
