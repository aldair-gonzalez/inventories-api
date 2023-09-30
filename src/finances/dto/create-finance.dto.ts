import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateFinanceDto {
  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  transaction: number;
}
