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
import { PaymentMethodsService } from './payment-methods.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
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
  BadRequestExample,
  PaymentMethodExample,
  deletedResponseExample,
  notFoundResponseExample,
} from 'src/utils/swagger.examples';

const answerExamples = {
  NotFoundResponseExample: notFoundResponseExample({ objectName: 'inventory' }),
  DeletedResponseExample: deletedResponseExample({ objectName: 'inventory' }),
};

@ApiTags('payment-methods')
@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @ApiOperation({ summary: 'Create payment method' })
  @ApiCreatedResponse({
    description: 'The payment method has been successfully created',
    schema: { example: PaymentMethodExample },
  })
  @Post()
  async create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    try {
      ParseTrimFromDto(createPaymentMethodDto);
      return await this.paymentMethodsService.create(createPaymentMethodDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all payment methods' })
  @ApiOkResponse({
    description: 'The payment methods have been successfully retrieved',
    schema: { example: [PaymentMethodExample, PaymentMethodExample] },
  })
  @Get()
  async findAll() {
    try {
      return await this.paymentMethodsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get a payment method' })
  @ApiOkResponse({
    description: 'The payment method has been successfully retrieved.',
    schema: { example: PaymentMethodExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Get(':payment_method_id')
  async findOne(@Param('payment_method_id') payment_method_id: number) {
    try {
      if (isNaN(payment_method_id))
        throw new BadRequestException('payment_method_id must be a number');
      const payment_method = await this.paymentMethodsService.findOne(
        payment_method_id,
      );
      if (!payment_method)
        throw new BadRequestException('payment_method not found');
      return payment_method;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update a payment method' })
  @ApiOkResponse({
    description: 'The payment method has been successfully updated.',
    schema: { example: PaymentMethodExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Patch(':payment_method_id')
  async update(
    @Param('payment_method_id') payment_method_id: number,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    try {
      if (isNaN(payment_method_id))
        throw new BadRequestException('payment_method_id must be a number');
      const payment_method = await this.paymentMethodsService.findOne(
        payment_method_id,
      );
      if (!payment_method)
        throw new NotFoundException('payment_method not found');
      ParseTrimFromDto(updatePaymentMethodDto);
      return await this.paymentMethodsService.update(
        payment_method_id,
        updatePaymentMethodDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete a payment method' })
  @ApiNoContentResponse(answerExamples.DeletedResponseExample)
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Delete(':payment_method_id')
  @HttpCode(204)
  async remove(@Param('payment_method_id') payment_method_id: number) {
    try {
      if (isNaN(payment_method_id))
        throw new BadRequestException('payment_method_id must be a number');
      const payment_method = await this.paymentMethodsService.findOne(
        payment_method_id,
      );
      if (!payment_method)
        throw new NotFoundException('payment_method not found');
      await this.paymentMethodsService.remove(payment_method_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
