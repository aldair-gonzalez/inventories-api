import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVendorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsOptional()
  @IsNumber()
  zip_code: number;

  @IsNotEmpty()
  @IsNumber()
  phone_number: number;

  @IsString()
  email_address: string;

  @IsString()
  website: string;

  @IsNotEmpty()
  @IsNumber()
  credit_limit: number;
}
