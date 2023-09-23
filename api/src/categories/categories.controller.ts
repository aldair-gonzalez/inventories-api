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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
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

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiCreatedResponse({
    description: 'The category has been successfully created.',
    schema: {
      example: {
        name: 'PANADERIA',
        description: 'PRODUCTOS ELABORADOS CON HARINA',
        category_id: 1,
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
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      ParseTrimFromDto(createCategoryDto);
      return await this.categoriesService.create(createCategoryDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({
    description: 'The categories has been successfully retrieved.',
    schema: {
      example: [
        {
          category_id: 1,
          name: 'PANADERIA',
          description: 'PRODUCTOS ELABORADOS CON HARINA',
        },
      ],
    },
  })
  @Get()
  async findAll() {
    try {
      return await this.categoriesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get one category' })
  @ApiOkResponse({
    description: 'The category has been successfully retrieved.',
    schema: {
      example: {
        category_id: 1,
        name: 'PANADERIA',
        description: 'PRODUCTOS ELABORADOS CON HARINA',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      example: {
        message: 'category_id should be a number',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    schema: {
      example: {
        message: 'category not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Get(':category_id')
  async findOne(@Param('category_id') category_id: number) {
    try {
      if (isNaN(category_id))
        throw new BadRequestException('category_id should be a number');
      const category = await this.categoriesService.findOne(category_id);
      if (!category) throw new NotFoundException('category not found');
      return category;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update one category' })
  @ApiOkResponse({
    description: 'The category has been successfully updated.',
    schema: {
      example: {
        generatedMaps: [],
        raw: [],
        affected: 1,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    schema: {
      example: {
        message: 'category not found',
        error: 'Not Found',
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
  @Patch(':category_id')
  async update(
    @Param('category_id') category_id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      if (isNaN(category_id))
        throw new BadRequestException('category_id should be a number');
      const category = await this.categoriesService.findOne(category_id);
      if (!category) throw new NotFoundException('category not found');
      ParseTrimFromDto(UpdateCategoryDto);
      return await this.categoriesService.update(
        category_id,
        updateCategoryDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete one category' })
  @ApiNoContentResponse({
    description: 'The category has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    schema: {
      example: {
        message: 'category not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Delete(':category_id')
  @HttpCode(204)
  async remove(@Param('category_id') category_id: number) {
    try {
      if (isNaN(category_id))
        throw new BadRequestException('category_id should be a number');
      const category = await this.categoriesService.findOne(category_id);
      if (!category) throw new NotFoundException('category not found');
      await this.categoriesService.remove(category_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
