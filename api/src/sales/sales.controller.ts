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
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    try {
      ParseTrimFromDto(createSaleDto);
      return await this.salesService.create(createSaleDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.salesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get(':sale_id')
  async findOne(@Param('sale_id') sale_id: number) {
    try {
      if (isNaN(sale_id))
        throw new BadRequestException('sale_id must be a number');
      const sale = await this.salesService.findOne(sale_id);
      if (!sale) throw new BadRequestException('sale not found');
      return sale;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Patch(':sale_id')
  async update(
    @Param('sale_id') sale_id: number,
    @Body() updateSaleDto: UpdateSaleDto,
  ) {
    try {
      if (isNaN(sale_id))
        throw new BadRequestException('sale_id must be a number');
      const sale = await this.salesService.findOne(sale_id);
      if (!sale) throw new NotFoundException('sale not found');
      ParseTrimFromDto(updateSaleDto);
      return await this.salesService.update(sale_id, updateSaleDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Delete(':sale_id')
  @HttpCode(204)
  async remove(@Param('sale_id') sale_id: number) {
    try {
      if (isNaN(sale_id))
        throw new BadRequestException('sale_id must be a number');
      const sale = await this.salesService.findOne(sale_id);
      if (!sale) throw new NotFoundException('sale not found');
      await this.salesService.remove(sale_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
