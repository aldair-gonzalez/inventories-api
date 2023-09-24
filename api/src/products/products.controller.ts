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
import { deletedResponseExample } from '../utils/swagger.examples';
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
  ProductExample,
  UpdatedExample,
  notFoundResponseExample,
} from 'src/utils/swagger.examples';

const answerExamples = {
  NotFoundResponseExample: notFoundResponseExample({ objectName: 'product' }),
  DeletedResponseExample: deletedResponseExample({ objectName: 'product' }),
};

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create a product' })
  @ApiCreatedResponse({
    description: 'The product has been successfully created.',
    schema: { example: ProductExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
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

  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({
    description: 'The products have been successfully retrieved.',
    schema: { example: [ProductExample, ProductExample] },
  })
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

  @ApiOperation({ summary: 'Get a product' })
  @ApiOkResponse({
    description: 'The product has been successfully retrieved.',
    schema: { example: ProductExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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

  @ApiOperation({ summary: 'Update a product' })
  @ApiOkResponse({
    description: 'The product has been successfully updated.',
    schema: { example: UpdatedExample },
  })
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @ApiBadRequestResponse(BadRequestExample)
  @Patch(':product_id')
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

  @ApiOperation({ summary: 'Delete a product' })
  @ApiNoContentResponse(answerExamples.DeletedResponseExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Delete(':product_id')
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
