import { Injectable } from '@nestjs/common';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lots } from './entities/lot.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class LotsService {
  constructor(
    @InjectRepository(Lots)
    private readonly lotsRepository: Repository<Lots>,
  ) {}

  async create(createLotDto: CreateLotDto): Promise<Lots> {
    return await this.lotsRepository.save(createLotDto);
  }

  async findAll(): Promise<Lots[]> {
    return await this.lotsRepository.find({
      relations: ['purchase_order'],
    });
  }

  async findOne(lot_id: number): Promise<Lots> {
    return await this.lotsRepository.findOne({
      where: { lot_id },
      relations: ['purchase_order'],
    });
  }

  async update(
    lot_id: number,
    updateLotDto: UpdateLotDto,
  ): Promise<UpdateResult> {
    return await this.lotsRepository.update(lot_id, updateLotDto);
  }

  async remove(lot_id: number): Promise<void> {
    await this.lotsRepository.delete(lot_id);
  }
}
