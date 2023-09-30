import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  unit_cost: number;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty()
  purchase_date: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty()
  expiration_date: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  product: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  purchase_order: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  lot: number;
}
