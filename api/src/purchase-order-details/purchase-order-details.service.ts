import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase-order-detail.dto';
import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderDetails } from './entities/purchase-order-detail.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PurchaseOrderDetailsService {
  constructor(
    @InjectRepository(PurchaseOrderDetails)
    private readonly purchaseOrderDetailsRepository: Repository<PurchaseOrderDetails>,
  ) {}

  async create(
    createPurchaseOrderDetailDto: CreatePurchaseOrderDetailDto,
  ): Promise<PurchaseOrderDetails> {
    return await this.purchaseOrderDetailsRepository.save(
      createPurchaseOrderDetailDto,
    );
  }

  async findAll(): Promise<PurchaseOrderDetails[]> {
    return await this.purchaseOrderDetailsRepository.find({
      relations: ['product', 'purchase_order'],
    });
  }

  async findOne(
    purchase_order_detail_id: number,
  ): Promise<PurchaseOrderDetails> {
    return await this.purchaseOrderDetailsRepository.findOne({
      where: { purchase_order_detail_id },
      relations: ['product', 'purchase_order'],
    });
  }

  async update(
    purchase_order_detail_id: number,
    updatePurchaseOrderDetailDto: UpdatePurchaseOrderDetailDto,
  ): Promise<UpdateResult> {
    return await this.purchaseOrderDetailsRepository.update(
      purchase_order_detail_id,
      updatePurchaseOrderDetailDto,
    );
  }

  async remove(purchase_order_detail_id: number): Promise<void> {
    await this.purchaseOrderDetailsRepository.delete(purchase_order_detail_id);
  }
}
