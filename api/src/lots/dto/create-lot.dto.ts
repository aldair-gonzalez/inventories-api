import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLotDto {
  @IsNotEmpty()
  @IsString()
  lot_number: string;

  @IsNotEmpty()
  @IsNumber()
  purchase_order: number;
}
