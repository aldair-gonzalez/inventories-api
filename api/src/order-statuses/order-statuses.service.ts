import { Injectable } from '@nestjs/common';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatuses } from './entities/order-status.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class OrderStatusesService {
  constructor(
    @InjectRepository(OrderStatuses)
    private readonly orderStatusesRepository: Repository<OrderStatuses>,
  ) {}

  async create(
    createOrderStatusDto: CreateOrderStatusDto,
  ): Promise<OrderStatuses> {
    return await this.orderStatusesRepository.save(createOrderStatusDto);
  }

  async findAll(): Promise<OrderStatuses[]> {
    return await this.orderStatusesRepository.find();
  }

  async findOne(order_status_id: number): Promise<OrderStatuses> {
    return await this.orderStatusesRepository.findOne({
      where: { order_status_id },
    });
  }

  async update(
    order_status_id: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<UpdateResult> {
    return await this.orderStatusesRepository.update(
      order_status_id,
      updateOrderStatusDto,
    );
  }

  async remove(order_status_id: number): Promise<void> {
    await this.orderStatusesRepository.delete(order_status_id);
  }
}
