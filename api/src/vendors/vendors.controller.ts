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
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  async create(@Body() createVendorDto: CreateVendorDto) {
    try {
      ParseTrimFromDto(createVendorDto);
      return await this.vendorsService.create(createVendorDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return this.vendorsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get(':vendor_id')
  async findOne(@Param('vendor_id') vendor_id: number) {
    try {
      const vendor = await this.vendorsService.findOne(vendor_id);
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
    @Body() updateVendorDto: UpdateVendorDto,
  ) {
    try {
      const vendor = await this.vendorsService.findOne(vendor_id);
      if (!vendor) throw new NotFoundException('Vendor not found');
      ParseTrimFromDto(updateVendorDto);
      return await this.vendorsService.update(vendor_id, updateVendorDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('vendor_id') vendor_id: number) {
    try {
      if (isNaN(vendor_id))
        throw new BadRequestException('vendor_id should be a number');
      const vendor = await this.vendorsService.findOne(vendor_id);
      if (!vendor) throw new NotFoundException('Vendor not found');
      await this.vendorsService.remove(vendor_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
