import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLotDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lot_number: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  purchase_order: number;
}
