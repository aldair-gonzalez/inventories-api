import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreatePurchaseOrderDto {
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty()
  date: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty()
  delivery_date: Date;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  @ApiProperty()
  total_amount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  supplier: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  order_status: number;
}
