import { Injectable } from '@nestjs/common';
import { CreateLossDto } from './dto/create-loss.dto';
import { UpdateLossDto } from './dto/update-loss.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Losses } from './entities/loss.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class LossesService {
  constructor(
    @InjectRepository(Losses)
    private readonly lossesRepository: Repository<Losses>,
  ) {}

  async create(createLossDto: CreateLossDto): Promise<Losses> {
    return await this.lossesRepository.save(createLossDto);
  }

  async findAll(): Promise<Losses[]> {
    return await this.lossesRepository.find({
      relations: ['product', 'loss_type'],
    });
  }

  async findOne(loss_id: number): Promise<Losses> {
    return await this.lossesRepository.findOne({
      where: { loss_id },
      relations: ['product', 'loss_type'],
    });
  }

  async update(
    loss_id: number,
    updateLossDto: UpdateLossDto,
  ): Promise<UpdateResult> {
    return await this.lossesRepository.update(loss_id, updateLossDto);
  }

  async remove(loss_id: number): Promise<void> {
    await this.lossesRepository.delete(loss_id);
  }
}
