import { Injectable } from '@nestjs/common';
import { CreateLossesTypeDto } from './dto/create-losses-type.dto';
import { UpdateLossesTypeDto } from './dto/update-losses-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LossesType } from './entities/losses-type.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class LossesTypeService {
  constructor(
    @InjectRepository(LossesType)
    private readonly lossesTypeRepository: Repository<LossesType>,
  ) {}

  async create(createLossesTypeDto: CreateLossesTypeDto): Promise<LossesType> {
    return await this.lossesTypeRepository.save(createLossesTypeDto);
  }

  async findAll(): Promise<LossesType[]> {
    return await this.lossesTypeRepository.find();
  }

  async findOne(loss_type_id: number): Promise<LossesType> {
    return await this.lossesTypeRepository.findOne({ where: { loss_type_id } });
  }

  async update(
    loss_type_id: number,
    updateLossesTypeDto: UpdateLossesTypeDto,
  ): Promise<UpdateResult> {
    return await this.lossesTypeRepository.update(
      loss_type_id,
      updateLossesTypeDto,
    );
  }

  async remove(loss_type_id: number): Promise<void> {
    await this.lossesTypeRepository.delete(loss_type_id);
  }
}
