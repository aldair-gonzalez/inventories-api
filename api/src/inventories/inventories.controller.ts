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
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Post()
  async create(@Body() createInventoryDto: CreateInventoryDto) {
    try {
      ParseTrimFromDto(createInventoryDto);
      return await this.inventoriesService.create(createInventoryDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.inventoriesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get(':inventory_id')
  async findOne(@Param('inventory_id') inventory_id: number) {
    try {
      if (isNaN(inventory_id))
        throw new BadRequestException('inventory_id should be a number');
      const inventory = await this.inventoriesService.findOne(inventory_id);
      if (!inventory) throw new NotFoundException('inventory not found');
      return inventory;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Patch(':inventory_id')
  async update(
    @Param('inventory_id') inventory_id: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    try {
      if (isNaN(inventory_id))
        throw new BadRequestException('inventory_id should be a number');
      const inventory = await this.inventoriesService.findOne(inventory_id);
      if (!inventory) throw new NotFoundException('inventory not found');
      ParseTrimFromDto(updateInventoryDto);
      return await this.inventoriesService.update(
        inventory_id,
        updateInventoryDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Delete(':inventory_id')
  async remove(@Param('inventory_id') inventory_id: number) {
    try {
      if (isNaN(inventory_id))
        throw new BadRequestException('inventory_id should be a number');
      const inventory = await this.inventoriesService.findOne(inventory_id);
      if (!inventory) throw new NotFoundException('inventory not found');
      await this.inventoriesService.remove(inventory_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
