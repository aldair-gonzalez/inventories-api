import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Suppliers } from './entities/supplier.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Suppliers)
    private readonly vendorsRepository: Repository<Suppliers>,
  ) {}

  async create(createVendorDto: CreateSupplierDto): Promise<Suppliers> {
    return await this.vendorsRepository.save(createVendorDto);
  }

  async findAll(): Promise<Suppliers[]> {
    return await this.vendorsRepository.find();
  }

  async findOne(supplier_id: number): Promise<Suppliers> {
    return await this.vendorsRepository.findOne({ where: { supplier_id } });
  }

  async update(
    supplier_id: number,
    updateVendorDto: UpdateSupplierDto,
  ): Promise<UpdateResult> {
    return await this.vendorsRepository.update(supplier_id, updateVendorDto);
  }

  async remove(supplier_id: number): Promise<void> {
    await this.vendorsRepository.delete(supplier_id);
  }
}
