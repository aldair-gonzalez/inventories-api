import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVendorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsNumber()
  zip_code: number;

  @IsNotEmpty()
  @IsNumber()
  phone_number: number;

  @IsOptional()
  @IsString()
  email_address: string;

  @IsOptional()
  @IsString()
  website: string;

  @IsNotEmpty()
  @IsNumber()
  credit_limit: number;
}
