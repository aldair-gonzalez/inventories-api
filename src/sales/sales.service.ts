import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sales } from './entities/sale.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sales)
    private readonly salesRepository: Repository<Sales>,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sales> {
    return await this.salesRepository.save(createSaleDto);
  }

  async findAll(): Promise<Sales[]> {
    return await this.salesRepository.find({
      relations: ['payment_method'],
    });
  }

  async findOne(sale_id: number): Promise<Sales> {
    return await this.salesRepository.findOne({
      where: { sale_id },
      relations: ['payment_method'],
    });
  }

  async update(
    sale_id: number,
    updateSaleDto: UpdateSaleDto,
  ): Promise<UpdateResult> {
    return await this.salesRepository.update(sale_id, updateSaleDto);
  }

  async remove(sale_id: number): Promise<void> {
    await this.salesRepository.delete(sale_id);
  }
}
