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

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

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

  @Patch(':category_id')
  async update(
    @Param('category_id') category_id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    if (isNaN(+category_id))
      throw new BadRequestException('category_id should be a number');
    const category = await this.categoriesService.findOne(category_id);
    if (!category) throw new NotFoundException('category not found');
    ParseTrimFromDto(UpdateCategoryDto);
    return await this.categoriesService.update(+category_id, updateCategoryDto);
  }

  @Delete(':category_id')
  @HttpCode(204)
  async remove(@Param('category_id') category_id: number) {
    try {
      if (isNaN(+category_id))
        throw new BadRequestException('category_id should be a number');
      const category = await this.categoriesService.findOne(category_id);
      if (!category) throw new NotFoundException('category not found');
      await this.categoriesService.remove(+category_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
