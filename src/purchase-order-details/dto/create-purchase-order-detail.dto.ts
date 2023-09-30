import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreatePurchaseOrderDetailDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  product: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  purchase_order: number;
}
