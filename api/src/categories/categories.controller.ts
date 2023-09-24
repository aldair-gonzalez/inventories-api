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
import {
  BadRequestExample,
  CategoryExample,
  UpdatedExample,
  deletedResponseExample,
  notFoundResponseExample,
} from 'src/utils/swagger.examples';

const answerExamples = {
  NotFoundResponseExample: notFoundResponseExample({ objectName: 'category' }),
  DeletedResponseExample: deletedResponseExample({ objectName: 'category' }),
};

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiCreatedResponse({
    description: 'The category has been successfully created.',
    schema: { example: CategoryExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
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
    schema: { example: [CategoryExample, CategoryExample] },
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
    schema: { example: CategoryExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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
    schema: { example: UpdatedExample },
  })
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @ApiBadRequestResponse(BadRequestExample)
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
  @ApiNoContentResponse(answerExamples.DeletedResponseExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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
