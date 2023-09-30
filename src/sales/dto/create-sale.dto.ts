import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty()
  date: Date;

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
  payment_method: number;
}
