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
  PurchaseOrderDetailsExample,
  BadRequestExample,
} from '../utils/swagger.examples';

const answerExamples = {
  NotFoundResponseExample: notFoundResponseExample({
    objectName: 'purchase order details',
  }),
  DeletedResponseExample: deletedResponseExample({
    objectName: 'purchase order details',
  }),
};

@ApiTags('purchase-order-details')
@Controller('purchase-order-details')
export class PurchaseOrderDetailsController {
  constructor(
    private readonly purchaseOrderDetailsService: PurchaseOrderDetailsService,
  ) {}

  @ApiOperation({ summary: 'Create purchase order details' })
  @ApiCreatedResponse({
    description: 'The purchase order details has been successfully created.',
    schema: { example: PurchaseOrderDetailsExample },
  })
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

  @ApiOperation({ summary: 'Get all purchase order details' })
  @ApiOkResponse({
    description: 'The purchase order details has been successfully retrieved.',
    schema: {
      example: [PurchaseOrderDetailsExample, PurchaseOrderDetailsExample],
    },
  })
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

  @ApiOperation({ summary: 'Ger a purchase order details' })
  @ApiOkResponse({
    description: 'The purchase order details has been succesfully retrieved.',
    schema: { example: PurchaseOrderDetailsExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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

  @ApiOperation({ summary: 'Update a purchase order details' })
  @ApiOkResponse({
    description: 'The purchase order details has been successfully updated.',
    schema: { example: PurchaseOrderDetailsExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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

  @ApiOperation({ summary: 'Delete a purchase order details' })
  @ApiNoContentResponse(answerExamples.DeletedResponseExample)
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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
