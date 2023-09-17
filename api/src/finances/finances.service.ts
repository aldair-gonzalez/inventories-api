import { Injectable } from '@nestjs/common';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Finances } from './entities/finance.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class FinancesService {
  constructor(
    @InjectRepository(Finances)
    private readonly financesRepository: Repository<Finances>,
  ) {}

  async create(createFinanceDto: CreateFinanceDto): Promise<Finances> {
    return await this.financesRepository.save(createFinanceDto);
  }

  async findAll(): Promise<Finances[]> {
    return await this.financesRepository.find({
      relations: ['transaction'],
    });
  }

  async findOne(finance_id: number): Promise<Finances> {
    return await this.financesRepository.findOne({
      where: { finance_id },
      relations: ['transaction'],
    });
  }

  async update(
    finance_id: number,
    updateFinanceDto: UpdateFinanceDto,
  ): Promise<UpdateResult> {
    return await this.financesRepository.update(finance_id, updateFinanceDto);
  }

  async remove(finance_id: number): Promise<void> {
    await this.financesRepository.delete(finance_id);
  }
}
