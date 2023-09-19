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
import { PurchaseOrdersService } from './purchase-orders.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@Controller('purchase-orders')
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {}

  @Post()
  async create(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    try {
      ParseTrimFromDto(createPurchaseOrderDto);
      return await this.purchaseOrdersService.create(createPurchaseOrderDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.purchaseOrdersService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get(':purchase_order_id')
  async findOne(@Param('purchase_order_id') purchase_order_id: number) {
    try {
      if (isNaN(purchase_order_id))
        throw new BadRequestException('purchase_order_id should be a number');
      const pruchaseOrder = await this.purchaseOrdersService.findOne(
        purchase_order_id,
      );
      if (!pruchaseOrder)
        throw new NotFoundException('pruchaseOrder not found');
      return pruchaseOrder;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Patch(':purchase_order_id')
  async update(
    @Param('purchase_order_id') purchase_order_id: number,
    @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ) {
    try {
      if (isNaN(purchase_order_id))
        throw new BadRequestException('purchase_order_id should be a number');
      const purchaseOrder = await this.purchaseOrdersService.findOne(
        purchase_order_id,
      );
      if (!purchaseOrder)
        throw new NotFoundException('purchaseOrder not found');
      ParseTrimFromDto(updatePurchaseOrderDto);
      return await this.purchaseOrdersService.update(
        purchase_order_id,
        updatePurchaseOrderDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Delete(':purchase_order_id')
  @HttpCode(204)
  async remove(@Param('purchase_order_id') purchase_order_id: number) {
    try {
      if (isNaN(purchase_order_id))
        throw new BadRequestException('purchase_order_id should be a number');
      const purchaseOrder = await this.purchaseOrdersService.findOne(
        purchase_order_id,
      );
      if (!purchaseOrder)
        throw new NotFoundException('purchaseOrder not found');
      await this.purchaseOrdersService.remove(purchase_order_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
