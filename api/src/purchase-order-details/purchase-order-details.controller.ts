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
import { PurchaseOrderDetailsService } from './purchase-order-details.service';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase-order-detail.dto';
import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase-order-detail.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@Controller('purchase-order-details')
export class PurchaseOrderDetailsController {
  constructor(
    private readonly purchaseOrderDetailsService: PurchaseOrderDetailsService,
  ) {}

  @Post()
  async create(
    @Body() createPurchaseOrderDetailDto: CreatePurchaseOrderDetailDto,
  ) {
    try {
      ParseTrimFromDto(createPurchaseOrderDetailDto);
      return await this.purchaseOrderDetailsService.create(
        createPurchaseOrderDetailDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.purchaseOrderDetailsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get(':purchase_order_detail_id')
  async findOne(
    @Param('purchase_order_detail_id') purchase_order_detail_id: number,
  ) {
    try {
      if (isNaN(purchase_order_detail_id))
        throw new BadRequestException(
          'purchase_order_detail_id should be a number',
        );
      const purchaseOrderDetail =
        await this.purchaseOrderDetailsService.findOne(
          purchase_order_detail_id,
        );
      if (!purchaseOrderDetail)
        throw new NotFoundException('purchaseOrderDetail not found');
      return purchaseOrderDetail;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Patch(':purchase_order_detail_id')
  async update(
    @Param('purchase_order_detail_id') purchase_order_detail_id: number,
    @Body() updatePurchaseOrderDetailDto: UpdatePurchaseOrderDetailDto,
  ) {
    try {
      if (isNaN(purchase_order_detail_id))
        throw new BadRequestException(
          'purchase_order_detail_id should be a number',
        );
      const purchaseOrderDetails =
        await this.purchaseOrderDetailsService.findOne(
          purchase_order_detail_id,
        );
      if (!purchaseOrderDetails)
        throw new NotFoundException('purchaseOrderDetails not found');
      ParseTrimFromDto(updatePurchaseOrderDetailDto);
      return await this.purchaseOrderDetailsService.update(
        purchase_order_detail_id,
        updatePurchaseOrderDetailDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Delete(':purchase_order_detail_id')
  @HttpCode(204)
  async remove(
    @Param('purchase_order_detail_id') purchase_order_detail_id: number,
  ) {
    try {
      if (isNaN(purchase_order_detail_id))
        throw new BadRequestException(
          'purchase_order_detail_id should be a number',
        );
      const purchaseOrderDetail =
        await this.purchaseOrderDetailsService.findOne(
          purchase_order_detail_id,
        );
      if (!purchaseOrderDetail)
        throw new NotFoundException('purchaseOrderDetail not found');
      await this.purchaseOrderDetailsService.remove(purchase_order_detail_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
