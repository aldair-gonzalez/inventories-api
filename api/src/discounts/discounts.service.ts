import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discounts } from './entities/discount.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discounts)
    private readonly discountsRepository: Repository<Discounts>,
  ) {}

  async create(createDiscountDto: CreateDiscountDto): Promise<Discounts> {
    return await this.discountsRepository.save(createDiscountDto);
  }

  async findAll(): Promise<Discounts[]> {
    return await this.discountsRepository.find({
      relations: ['product'],
    });
  }

  async findOne(discount_id: number): Promise<Discounts> {
    return await this.discountsRepository.findOne({
      where: { discount_id },
      relations: ['product'],
    });
  }

  async update(
    discount_id: number,
    updateDiscountDto: UpdateDiscountDto,
  ): Promise<UpdateResult> {
    return await this.discountsRepository.update(
      discount_id,
      updateDiscountDto,
    );
  }

  async remove(discount_id: number): Promise<void> {
    await this.discountsRepository.delete(discount_id);
  }
}
