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
import { SalesDetailsService } from './sales-details.service';
import { CreateSalesDetailDto } from './dto/create-sales-detail.dto';
import { UpdateSalesDetailDto } from './dto/update-sales-detail.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@Controller('sales-details')
export class SalesDetailsController {
  constructor(private readonly salesDetailsService: SalesDetailsService) {}

  @Post()
  async create(@Body() createSalesDetailDto: CreateSalesDetailDto) {
    try {
      ParseTrimFromDto(createSalesDetailDto);
      return await this.salesDetailsService.create(createSalesDetailDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.salesDetailsService.findAll();
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
      const sale_detils = await this.salesDetailsService.findOne(sale_id);
      if (!sale_detils) throw new BadRequestException('sale_detils not found');
      return sale_detils;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Patch(':sale_id')
  async update(
    @Param('sale_id') sale_id: number,
    @Body() updateSalesDetailDto: UpdateSalesDetailDto,
  ) {
    try {
      if (isNaN(sale_id))
        throw new BadRequestException('sale_id must be a number');
      const sale_details = await this.salesDetailsService.findOne(sale_id);
      if (!sale_details) throw new NotFoundException('sale_details not found');
      ParseTrimFromDto(updateSalesDetailDto);
      return await this.salesDetailsService.update(
        sale_id,
        updateSalesDetailDto,
      );
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
      const sale_details = await this.salesDetailsService.findOne(sale_id);
      if (!sale_details) throw new NotFoundException('sale_details not found');
      await this.salesDetailsService.remove(sale_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
