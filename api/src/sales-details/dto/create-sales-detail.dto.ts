import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSalesDetailDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  product: number;
}
