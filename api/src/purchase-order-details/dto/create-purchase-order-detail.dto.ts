import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreatePurchaseOrderDetailDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  product: number;

  @IsNotEmpty()
  @IsNumber()
  purchase_order: number;
}
