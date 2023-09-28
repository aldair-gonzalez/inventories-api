import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateDiscountDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  discount_type: string;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  @ApiProperty()
  discount_amount: number;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty()
  discount_start_date: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty()
  discount_end_date: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  product: number;
}
