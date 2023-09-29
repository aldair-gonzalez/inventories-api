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
import { SalesDetailsService } from './sales-details.service';
import { CreateSalesDetailDto } from './dto/create-sales-detail.dto';
import { UpdateSalesDetailDto } from './dto/update-sales-detail.dto';
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
  SaleDetailsExample,
  deletedResponseExample,
  notFoundResponseExample,
} from 'src/utils/swagger.examples';

const answerExamples = {
  NotFoundResponseExample: notFoundResponseExample({
    objectName: 'sales-details',
  }),
  DeletedResponseExample: deletedResponseExample({
    objectName: 'sales-details',
  }),
};

@ApiTags('sales-details')
@Controller('sales-details')
export class SalesDetailsController {
  constructor(private readonly salesDetailsService: SalesDetailsService) {}

  @ApiOperation({ summary: 'Create a sale details' })
  @ApiCreatedResponse({
    description: 'The sale details has been succesfully created',
    schema: { example: SaleDetailsExample },
  })
  @Post()
  async create(@Body() createSalesDetailDto: CreateSalesDetailDto) {
    try {
      ParseTrimFromDto(createSalesDetailDto);
      return await this.salesDetailsService.create(createSalesDetailDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all sales details' })
  @ApiOkResponse({
    description: 'The sales details have been succesfully retrieved',
    schema: { example: [SaleDetailsExample, SaleDetailsExample] },
  })
  @Get()
  async findAll() {
    try {
      return await this.salesDetailsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get a sale details' })
  @ApiOkResponse({
    description: 'The sale details has been succesfully retrieved',
    schema: { example: SaleDetailsExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Get(':sale_id')
  async findOne(@Param('sale_id') sale_id: number) {
    try {
      if (isNaN(sale_id))
        throw new BadRequestException('sale_id must be a number');
      const sale_detils = await this.salesDetailsService.findOne(sale_id);
      if (!sale_detils) throw new BadRequestException('sale_detils not found');
      return sale_detils;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update a sale details' })
  @ApiOkResponse({
    description: 'The sale details has been succesfully updated',
    schema: { example: SaleDetailsExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Patch(':sale_id')
  async update(
    @Param('sale_id') sale_id: number,
    @Body() updateSalesDetailDto: UpdateSalesDetailDto,
  ) {
    try {
      if (isNaN(sale_id))
        throw new BadRequestException('sale_id must be a number');
      const sale_details = await this.salesDetailsService.findOne(sale_id);
      if (!sale_details) throw new NotFoundException('sale_details not found');
      ParseTrimFromDto(updateSalesDetailDto);
      return await this.salesDetailsService.update(
        sale_id,
        updateSalesDetailDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete a sale details' })
  @ApiNoContentResponse(answerExamples.DeletedResponseExample)
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Delete(':sale_id')
  @HttpCode(204)
  async remove(@Param('sale_id') sale_id: number) {
    try {
      if (isNaN(sale_id))
        throw new BadRequestException('sale_id must be a number');
      const sale_details = await this.salesDetailsService.findOne(sale_id);
      if (!sale_details) throw new NotFoundException('sale_details not found');
      await this.salesDetailsService.remove(sale_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
