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
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
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
  SupplierExample,
  UpdatedExample,
} from 'src/utils/swagger.examples';
import {
  notFoundResponseExample,
  deletedResponseExample,
} from '../utils/swagger.examples';

const answerExamples = {
  NotFoundResponseExample: notFoundResponseExample({ objectName: 'supplier' }),
  DeletedResponseExample: deletedResponseExample({ objectName: 'supplier' }),
};

@ApiTags('suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @ApiOperation({ summary: 'Create a new supplier' })
  @ApiCreatedResponse({
    description: 'The supplier has been successfully created',
    schema: { example: SupplierExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @Post()
  async create(@Body() createVendorDto: CreateSupplierDto) {
    try {
      ParseTrimFromDto(createVendorDto);
      return await this.suppliersService.create(createVendorDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all suppliers' })
  @ApiOkResponse({
    description: 'All suppliers have been successfully retrieved',
    schema: { example: [SupplierExample, SupplierExample] },
  })
  @Get()
  async findAll() {
    try {
      return await this.suppliersService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get a supplier' })
  @ApiOkResponse({
    description: 'The supplier has been successfully retrieved',
    schema: { example: SupplierExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Get(':vendor_id')
  async findOne(@Param('vendor_id') vendor_id: number) {
    try {
      if (isNaN(vendor_id))
        throw new BadRequestException('vendor_id should be a number');
      const vendor = await this.suppliersService.findOne(vendor_id);
      if (!vendor) throw new NotFoundException('Vendor not found');
      return vendor;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update a supplier' })
  @ApiOkResponse({
    description: 'The supplier has been successfully updated',
    schema: { example: UpdatedExample },
  })
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @ApiBadRequestResponse(BadRequestExample)
  @Patch(':vendor_id')
  async update(
    @Param('vendor_id') vendor_id: number,
    @Body() updateVendorDto: UpdateSupplierDto,
  ) {
    try {
      if (isNaN(vendor_id))
        throw new BadRequestException('vendor_id should be a number');
      const vendor = await this.suppliersService.findOne(vendor_id);
      if (!vendor) throw new NotFoundException('Vendor not found');
      ParseTrimFromDto(updateVendorDto);
      return await this.suppliersService.update(vendor_id, updateVendorDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete a supplier' })
  @ApiNoContentResponse(answerExamples.DeletedResponseExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Delete(':vendor_id')
  @HttpCode(204)
  async remove(@Param('vendor_id') vendor_id: number) {
    try {
      if (isNaN(vendor_id))
        throw new BadRequestException('vendor_id should be a number');
      const vendor = await this.suppliersService.findOne(vendor_id);
      if (!vendor) throw new NotFoundException('Vendor not found');
      await this.suppliersService.remove(vendor_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
