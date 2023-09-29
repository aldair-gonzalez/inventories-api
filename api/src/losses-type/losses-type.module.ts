import { Module } from '@nestjs/common';
import { LossesTypeService } from './losses-type.service';
import { LossesTypeController } from './losses-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LossesType } from './entities/losses-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LossesType])],
  controllers: [LossesTypeController],
  providers: [LossesTypeService],
  exports: [LossesTypeService],
})
export class LossesTypeModule {}
