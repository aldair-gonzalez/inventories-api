import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    try {
      ParseTrimFromDto(createTransactionDto);
      return await this.transactionsService.create(createTransactionDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.transactionsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get(':transaction_id')
  async findOne(@Param('transaction_id') transaction_id: number) {
    try {
      if (isNaN(transaction_id))
        throw new BadRequestException('transaction_id should be a number');
      const transaction = await this.transactionsService.findOne(
        transaction_id,
      );
      if (!transaction) throw new NotFoundException('transaction not found');
      return transaction;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Patch(':transaction_id')
  async update(
    @Param('transaction_id') transaction_id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    try {
      if (isNaN(transaction_id))
        throw new BadRequestException('transaction_id should be a number');
      const transaction = await this.transactionsService.findOne(
        transaction_id,
      );
      if (!transaction) throw new NotFoundException('transaction not found');
      ParseTrimFromDto(updateTransactionDto);
      return await this.transactionsService.update(
        transaction_id,
        updateTransactionDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Delete(':transaction_id')
  async remove(@Param('transaction_id') transaction_id: number) {
    try {
      if (isNaN(transaction_id))
        throw new BadRequestException('transaction_id should be a number');
      const transaction = await this.transactionsService.findOne(
        transaction_id,
      );
      if (!transaction) throw new NotFoundException('transaction not found');
      await this.transactionsService.remove(transaction_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
