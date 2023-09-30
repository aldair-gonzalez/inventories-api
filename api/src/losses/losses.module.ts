import { Module } from '@nestjs/common';
import { LossesService } from './losses.service';
import { LossesController } from './losses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Losses } from './entities/loss.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Losses])],
  controllers: [LossesController],
  providers: [LossesService],
  exports: [LossesService],
})
export class LossesModule {}
