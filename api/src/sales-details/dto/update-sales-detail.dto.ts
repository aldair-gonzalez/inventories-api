import { PartialType } from '@nestjs/swagger';
import { CreateSalesDetailDto } from './create-sales-detail.dto';

export class UpdateSalesDetailDto extends PartialType(CreateSalesDetailDto) {}
