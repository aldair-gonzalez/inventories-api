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

@ApiTags('suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @ApiOperation({ summary: 'Create a new supplier' })
  @ApiCreatedResponse({
    description: 'The supplier has been successfully created',
    schema: {
      example: {
        name: 'SUPPLIER',
        description: 'SUPPLIER DESCRIPTION',
        address: '',
        city: '',
        state: '',
        zip_code: 11111,
        phone_number: 1111111111,
        email_address: '',
        website: '',
        credit_limit: 1000,
        supplier_id: 1,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      example: {
        message: [
          'name must be a string',
          'name should not be empty',
          'description must be a string',
          'description should not be empty',
          'address must be a string',
          'city must be a string',
          'state must be a string',
          'phone_number must be a number conforming to the specified constraints',
          'phone_number should not be empty',
          'email_address must be a string',
          'website must be a string',
          'credit_limit must not be less than 0.001',
          'credit_limit must be a number conforming to the specified constraints',
          'credit_limit should not be empty',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
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
    schema: {
      example: [
        {
          name: 'SUPPLIER',
          description: 'SUPPLIER DESCRIPTION',
          address: '',
          city: '',
          state: '',
          zip_code: 11111,
          phone_number: 1111111111,
          email_address: '',
          website: '',
          credit_limit: 1000,
          supplier_id: 1,
        },
      ],
    },
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
    schema: {
      example: {
        name: 'SUPPLIER',
        description: 'SUPPLIER DESCRIPTION',
        address: '',
        city: '',
        state: '',
        zip_code: 11111,
        phone_number: 1111111111,
        email_address: '',
        website: '',
        credit_limit: 1000,
        supplier_id: 1,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      example: {
        message: 'vendor_id should be a number',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    schema: {
      example: {
        message: 'Vendor not found',
        error: 'Bad Request',
        statusCode: 404,
      },
    },
  })
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
    schema: {
      example: {
        generatedMaps: [],
        raw: [],
        affected: 1,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    schema: {
      example: {
        message: 'Vendor not found',
        error: 'Bad Request',
        statusCode: 404,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      example: {
        message:
          'Cannot perform update query because update values are not defined. Call "qb.set(...)" method to specify updated values.',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
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
  @ApiNoContentResponse({
    description: 'The supplier has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    schema: {
      example: {
        message: 'Vendor not found',
        error: 'Bad Request',
        statusCode: 404,
      },
    },
  })
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
