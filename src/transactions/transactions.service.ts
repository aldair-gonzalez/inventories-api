import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from './entities/transaction.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private readonly transactionsRepository: Repository<Transactions>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transactions> {
    return await this.transactionsRepository.save(createTransactionDto);
  }

  async findAll(): Promise<Transactions[]> {
    return await this.transactionsRepository.find();
  }

  async findOne(transaction_id: number): Promise<Transactions> {
    return await this.transactionsRepository.findOne({
      where: { transaction_id },
    });
  }

  async update(
    transaction_id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<UpdateResult> {
    return await this.transactionsRepository.update(
      transaction_id,
      updateTransactionDto,
    );
  }

  async remove(transaction_id: number): Promise<void> {
    await this.transactionsRepository.delete(transaction_id);
  }
}
