import { Module } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { FinancesController } from './finances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finances } from './entities/finance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Finances])],
  controllers: [FinancesController],
  providers: [FinancesService],
  exports: [FinancesService],
})
export class FinancesModule {}
