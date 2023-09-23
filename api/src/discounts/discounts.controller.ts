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
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  async create(@Body() createDiscountDto: CreateDiscountDto) {
    try {
      ParseTrimFromDto(createDiscountDto);
      return await this.discountsService.create(createDiscountDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.discountsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get(':discount_id')
  async findOne(@Param('discount_id') discount_id: number) {
    try {
      if (isNaN(discount_id))
        throw new BadRequestException('discount_id must be a number');
      const discount = await this.discountsService.findOne(discount_id);
      if (!discount) throw new BadRequestException('discount not found');
      return discount;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Patch(':discount_id')
  async update(
    @Param('discount_id') discount_id: number,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    try {
      if (isNaN(discount_id))
        throw new BadRequestException('discount_id should be a number');
      const discount = await this.discountsService.findOne(discount_id);
      if (!discount) throw new NotFoundException('discount not found');
      ParseTrimFromDto(updateDiscountDto);
      return await this.discountsService.update(discount_id, updateDiscountDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Delete(':discount_id')
  @HttpCode(204)
  async remove(@Param('discount_id') discount_id: number) {
    try {
      if (isNaN(discount_id))
        throw new BadRequestException('discount_id should be a number');
      const discount = await this.discountsService.findOne(discount_id);
      if (!discount) throw new NotFoundException('discount not found');
      await this.discountsService.remove(discount_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
