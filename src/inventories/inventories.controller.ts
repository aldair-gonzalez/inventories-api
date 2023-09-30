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
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ParseTrimFromDto } from 'src/utils/trim';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  notFoundResponseExample,
  deletedResponseExample,
  InventoryExample,
  BadRequestExample,
} from '../utils/swagger.examples';

const answerExamples = {
  NotFoundResponseExample: notFoundResponseExample({ objectName: 'inventory' }),
  DeletedResponseExample: deletedResponseExample({ objectName: 'inventory' }),
};

@ApiTags('inventories')
@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @ApiOperation({ summary: 'Create inventory' })
  @ApiCreatedResponse({
    description: 'The inventory has been successfully created',
    schema: { example: InventoryExample },
  })
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

  @ApiOperation({ summary: 'Get all inventories' })
  @ApiOkResponse({
    description: 'The inventories have been successfully retrieved',
    schema: { example: [InventoryExample, InventoryExample] },
  })
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

  @ApiOperation({ summary: 'Get a inventory' })
  @ApiOkResponse({
    description: 'The inventory has been successfully retrieved.',
    schema: { example: InventoryExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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

  @ApiOperation({ summary: 'Update a inventory' })
  @ApiOkResponse({
    description: 'The inventory has been successfully updated.',
    schema: { example: InventoryExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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

  @ApiOperation({ summary: 'Delete a inventory' })
  @ApiNoContentResponse(answerExamples.DeletedResponseExample)
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Delete(':inventory_id')
  @HttpCode(204)
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
