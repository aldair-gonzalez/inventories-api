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

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

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
