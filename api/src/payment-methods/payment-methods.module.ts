import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethodsController } from './payment-methods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethods } from './entities/payment-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethods])],
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService],
  exports: [PaymentMethodsService],
})
export class PaymentMethodsModule {}
