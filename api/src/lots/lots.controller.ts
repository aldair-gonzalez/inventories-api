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
import { LotsService } from './lots.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@Controller('lots')
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}

  @Post()
  async create(@Body() createLotDto: CreateLotDto) {
    try {
      ParseTrimFromDto(createLotDto);
      return await this.lotsService.create(createLotDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.lotsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get(':lot_id')
  async findOne(@Param('lot_id') lot_id: number) {
    try {
      if (isNaN(lot_id))
        throw new BadRequestException('lot_id should be a number');
      const lot = await this.lotsService.findOne(lot_id);
      if (!lot) throw new NotFoundException('lot not found');
      return lot;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Patch(':lot_id')
  async update(
    @Param('lot_id') lot_id: number,
    @Body() updateLotDto: UpdateLotDto,
  ) {
    try {
      if (isNaN(lot_id))
        throw new BadRequestException('lot_id should be a number');
      const lot = await this.lotsService.findOne(lot_id);
      if (!lot) throw new NotFoundException('lot not found');
      ParseTrimFromDto(updateLotDto);
      return await this.lotsService.update(lot_id, updateLotDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Delete(':lot_id')
  @HttpCode(204)
  async remove(@Param('lot_id') lot_id: number) {
    try {
      if (isNaN(lot_id))
        throw new BadRequestException('lot_id should be a number');
      const lot = await this.lotsService.findOne(lot_id);
      if (!lot) throw new NotFoundException('lot not found');
      await this.lotsService.remove(lot_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
