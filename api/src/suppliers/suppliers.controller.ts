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

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

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

  @Get()
  async findAll() {
    try {
      return this.suppliersService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

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
