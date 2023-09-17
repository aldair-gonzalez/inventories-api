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
  HttpCode,
} from '@nestjs/common';
import { FinancesService } from './finances.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@Controller('finances')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @Post()
  async create(@Body() createFinanceDto: CreateFinanceDto) {
    try {
      ParseTrimFromDto(createFinanceDto);
      return await this.financesService.create(createFinanceDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.financesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get(':finance_id')
  async findOne(@Param('finance_id') finance_id: number) {
    try {
      if (isNaN(finance_id))
        throw new BadRequestException('finance_id should be a number');
      const finance = await this.financesService.findOne(finance_id);
      if (!finance) throw new NotFoundException('finance not found');
      return finance;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Patch(':finance_id')
  async update(
    @Param('finance_id') finance_id: number,
    @Body() updateFinanceDto: UpdateFinanceDto,
  ) {
    try {
      if (isNaN(finance_id))
        throw new BadRequestException('finance_id should be a number');
      const finance = await this.financesService.findOne(finance_id);
      if (!finance) throw new NotFoundException('finance not found');
      ParseTrimFromDto(updateFinanceDto);
      return await this.financesService.update(finance_id, updateFinanceDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Delete(':finance_id')
  @HttpCode(204)
  async remove(@Param('finance_id') finance_id: number) {
    try {
      if (isNaN(finance_id))
        throw new BadRequestException('finance_id should be a number');
      const finance = await this.financesService.findOne(finance_id);
      if (!finance) throw new NotFoundException('finance not found');
      await this.financesService.remove(finance_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
