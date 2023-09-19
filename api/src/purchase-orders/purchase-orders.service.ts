import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrders } from './entities/purchase-order.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PurchaseOrdersService {
  constructor(
    @InjectRepository(PurchaseOrders)
    private readonly purchaseOrdersRepository: Repository<PurchaseOrders>,
  ) {}

  async create(
    createPurchaseOrderDto: CreatePurchaseOrderDto,
  ): Promise<PurchaseOrders> {
    return await this.purchaseOrdersRepository.save(createPurchaseOrderDto);
  }

  async findAll(): Promise<PurchaseOrders[]> {
    return await this.purchaseOrdersRepository.find({
      relations: ['supplier', 'order_status'],
    });
  }

  async findOne(purchase_order_id: number): Promise<PurchaseOrders> {
    return await this.purchaseOrdersRepository.findOne({
      where: { purchase_order_id },
      relations: ['supplier', 'order_status'],
    });
  }

  async update(
    purchase_order_id: number,
    updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ): Promise<UpdateResult> {
    return await this.purchaseOrdersRepository.update(
      purchase_order_id,
      updatePurchaseOrderDto,
    );
  }

  async remove(purchase_order_id: number): Promise<void> {
    await this.purchaseOrdersRepository.delete(purchase_order_id);
  }
}
