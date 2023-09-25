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
import {
  notFoundResponseExample,
  deletedResponseExample,
  OrderStatusesExample,
  BadRequestExample,
} from '../utils/swagger.examples';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

const answerExamples = {
  NotFoundResponseExample: notFoundResponseExample({
    objectName: 'order-statuses',
  }),
  DeletedResponseExample: deletedResponseExample({
    objectName: 'order-statuses',
  }),
};

@ApiTags('order-statuses')
@Controller('order-statuses')
export class OrderStatusesController {
  constructor(private readonly orderStatusesService: OrderStatusesService) {}

  @ApiOperation({ summary: 'Create order status' })
  @ApiCreatedResponse({
    description: 'The order status has been successfully created.',
    schema: { example: OrderStatusesExample },
  })
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

  @ApiOperation({ summary: 'Get all order statuses' })
  @ApiOkResponse({
    description: 'The order status has been successfully retrieved.',
    schema: { example: [OrderStatusesExample, OrderStatusesExample] },
  })
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

  @ApiOperation({ summary: 'Get a order status' })
  @ApiOkResponse({
    description: 'The order status has been successfully retrieved',
    schema: { example: OrderStatusesExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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

  @ApiOperation({ summary: 'Update a order status' })
  @ApiOkResponse({
    description: 'The order status has been successfully updated.',
    schema: { example: OrderStatusesExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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

  @ApiOperation({ summary: 'Delete a order status' })
  @ApiNoContentResponse(answerExamples.DeletedResponseExample)
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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
