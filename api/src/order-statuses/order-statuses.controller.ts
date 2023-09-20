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
import { OrderStatusesService } from './order-statuses.service';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@Controller('order-statuses')
export class OrderStatusesController {
  constructor(private readonly orderStatusesService: OrderStatusesService) {}

  @Post()
  async create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    try {
      ParseTrimFromDto(createOrderStatusDto);
      return await this.orderStatusesService.create(createOrderStatusDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.orderStatusesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get(':order_status_id')
  async findOne(@Param('order_status_id') order_status_id: number) {
    try {
      if (isNaN(order_status_id))
        throw new BadRequestException('order_status_id should be a number');
      const orderStatus = await this.orderStatusesService.findOne(
        order_status_id,
      );
      if (!orderStatus) throw new NotFoundException('orderStatus not found');
      return orderStatus;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Patch(':order_status_id')
  async update(
    @Param('order_status_id') order_status_id: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    try {
      if (isNaN(order_status_id))
        throw new BadRequestException('order_status_id should be a number');
      const orderStatus = await this.orderStatusesService.findOne(
        order_status_id,
      );
      if (!orderStatus) throw new NotFoundException('orderStatus not found');
      ParseTrimFromDto(updateOrderStatusDto);
      return await this.orderStatusesService.update(
        order_status_id,
        updateOrderStatusDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Delete(':order_status_id')
  async remove(@Param('order_status_id') order_status_id: number) {
    try {
      if (isNaN(order_status_id))
        throw new BadRequestException('order_status_id should be a number');
      const orderStatus = await this.orderStatusesService.findOne(
        order_status_id,
      );
      if (!orderStatus) throw new NotFoundException('orderStatus not found');
      await this.orderStatusesService.remove(order_status_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
