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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      ParseTrimFromDto(createProductDto);
      return await this.productsService.create(createProductDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get(':product_id')
  async findOne(@Param('product_id') product_id: number) {
    try {
      if (isNaN(product_id))
        throw new BadRequestException('product_id should be a number');
      const product = await this.productsService.findOne(product_id);
      if (!product) throw new NotFoundException('product not found');
      return product;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('product_id') product_id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      if (isNaN(product_id))
        throw new BadRequestException('product_id should be a number');
      const product = await this.productsService.findOne(product_id);
      if (!product) throw new NotFoundException('product not found');
      ParseTrimFromDto(updateProductDto);
      return await this.productsService.update(product_id, updateProductDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('product_id') product_id: number) {
    try {
      if (isNaN(product_id))
        throw new BadRequestException('product_id should be a number');
      const product = await this.productsService.findOne(product_id);
      if (!product) throw new NotFoundException('product not found');
      await this.productsService.remove(product_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
