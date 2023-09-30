import { PartialType } from '@nestjs/swagger';
import { CreateLossDto } from './create-loss.dto';

export class UpdateLossDto extends PartialType(CreateLossDto) {}
