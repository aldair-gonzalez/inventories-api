import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventories } from './entities/inventory.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventories)
    private readonly inventoriesRepository: Repository<Inventories>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventories> {
    return await this.inventoriesRepository.save(createInventoryDto);
  }

  async findAll(): Promise<Inventories[]> {
    return await this.inventoriesRepository.find({
      relations: ['product', 'purchase_order', 'lot'],
    });
  }

  async findOne(inventory_id: number): Promise<Inventories> {
    return await this.inventoriesRepository.findOne({
      where: { inventory_id },
      relations: ['product', 'purchase_order', 'lot'],
    });
  }

  async update(
    inventory_id: number,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<UpdateResult> {
    return await this.inventoriesRepository.update(
      inventory_id,
      updateInventoryDto,
    );
  }

  async remove(inventory_id: number): Promise<void> {
    await this.inventoriesRepository.delete(inventory_id);
  }
}
