import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethods } from './entities/payment-method.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethods)
    private readonly paymentMethodsRepository: Repository<PaymentMethods>,
  ) {}

  async create(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethods> {
    return await this.paymentMethodsRepository.save(createPaymentMethodDto);
  }

  async findAll(): Promise<PaymentMethods[]> {
    return await this.paymentMethodsRepository.find();
  }

  async findOne(payment_method_id: number): Promise<PaymentMethods> {
    return await this.paymentMethodsRepository.findOne({
      where: { payment_method_id },
    });
  }

  async update(
    payment_method_id: number,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<UpdateResult> {
    return await this.paymentMethodsRepository.update(
      payment_method_id,
      updatePaymentMethodDto,
    );
  }

  async remove(payment_method_id: number): Promise<void> {
    await this.paymentMethodsRepository.delete(payment_method_id);
  }
}
