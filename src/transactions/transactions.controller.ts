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
import {
  notFoundResponseExample,
  deletedResponseExample,
  TransactionExample,
  BadRequestExample,
} from '../utils/swagger.examples';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

const answerExamples = {
  NotFoundResponseExample: notFoundResponseExample({
    objectName: 'transaction',
  }),
  DeletedResponseExample: deletedResponseExample({ objectName: 'transaction' }),
};

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({ summary: 'Create transaction' })
  @ApiCreatedResponse({
    description: 'The transaction has been successfully created.',
    schema: { example: TransactionExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
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

  @ApiOperation({ summary: 'Get all transactions' })
  @ApiOkResponse({
    description: 'The transactions has been successfully returned.',
    schema: { example: [TransactionExample, TransactionExample] },
  })
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

  @ApiOperation({ summary: 'Get a transaction' })
  @ApiOkResponse({
    description: 'The transaction has been successfully returned.',
    schema: { example: TransactionExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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

  @ApiOperation({ summary: 'Update a transaction' })
  @ApiOkResponse({
    description: 'The transaction has been successfully updated.',
    schema: { example: TransactionExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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

  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiNoContentResponse(answerExamples.DeletedResponseExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @ApiBadRequestResponse(BadRequestExample)
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
