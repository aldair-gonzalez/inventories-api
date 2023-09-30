import { Injectable } from '@nestjs/common';
import { CreateSalesDetailDto } from './dto/create-sales-detail.dto';
import { UpdateSalesDetailDto } from './dto/update-sales-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesDetails } from './entities/sales-detail.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SalesDetailsService {
  constructor(
    @InjectRepository(SalesDetails)
    private readonly salesDetailsRepository: Repository<SalesDetails>,
  ) {}

  async create(
    createSalesDetailDto: CreateSalesDetailDto,
  ): Promise<SalesDetails> {
    return await this.salesDetailsRepository.save(createSalesDetailDto);
  }

  async findAll(): Promise<SalesDetails[]> {
    return await this.salesDetailsRepository.find({
      relations: ['product'],
    });
  }

  async findOne(sale_id: number): Promise<SalesDetails> {
    return await this.salesDetailsRepository.findOne({
      where: { sale_id },
      relations: ['product'],
    });
  }

  async update(
    sale_id: number,
    updateSalesDetailDto: UpdateSalesDetailDto,
  ): Promise<UpdateResult> {
    return await this.salesDetailsRepository.update(
      sale_id,
      updateSalesDetailDto,
    );
  }

  async remove(sale_id: number): Promise<void> {
    await this.salesDetailsRepository.delete(sale_id);
  }
}
