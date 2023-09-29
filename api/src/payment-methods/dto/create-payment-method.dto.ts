import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
