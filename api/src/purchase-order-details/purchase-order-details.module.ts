import { Module } from '@nestjs/common';
import { PurchaseOrderDetailsService } from './purchase-order-details.service';
import { PurchaseOrderDetailsController } from './purchase-order-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderDetails } from './entities/purchase-order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrderDetails])],
  controllers: [PurchaseOrderDetailsController],
  providers: [PurchaseOrderDetailsService],
  exports: [PurchaseOrderDetailsService],
})
export class PurchaseOrderDetailsModule {}
