import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendors } from './entities/vendor.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendors)
    private readonly vendorsRepository: Repository<Vendors>,
  ) {}

  async create(createVendorDto: CreateVendorDto): Promise<Vendors> {
    return this.vendorsRepository.save(createVendorDto);
  }

  async findAll(): Promise<Vendors[]> {
    return this.vendorsRepository.find();
  }

  async findOne(vendor_id: number): Promise<Vendors> {
    return await this.vendorsRepository.findOne({ where: { vendor_id } });
  }

  async update(
    vendor_id: number,
    updateVendorDto: UpdateVendorDto,
  ): Promise<UpdateResult> {
    return await this.vendorsRepository.update(vendor_id, updateVendorDto);
  }

  async remove(vendor_id: number): Promise<void> {
    await this.vendorsRepository.delete(vendor_id);
  }
}
