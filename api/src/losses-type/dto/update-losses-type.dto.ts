import { PartialType } from '@nestjs/swagger';
import { CreateLossesTypeDto } from './create-losses-type.dto';

export class UpdateLossesTypeDto extends PartialType(CreateLossesTypeDto) {}
