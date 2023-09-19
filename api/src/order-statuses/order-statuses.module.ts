import { Module } from '@nestjs/common';
import { OrderStatusesService } from './order-statuses.service';
import { OrderStatusesController } from './order-statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatuses } from './entities/order-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatuses])],
  controllers: [OrderStatusesController],
  providers: [OrderStatusesService],
  exports: [OrderStatusesService],
})
export class OrderStatusesModule {}
