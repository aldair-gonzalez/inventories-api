import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  state: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  zip_code: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  phone_number: number;

  @IsString()
  @ApiProperty()
  email_address: string;

  @IsString()
  @ApiProperty()
  website: string;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  @ApiProperty()
  credit_limit: number;
}
