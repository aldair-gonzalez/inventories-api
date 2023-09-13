import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/category.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Categories> {
    return await this.categoriesRepository.save(createCategoryDto);
  }

  async findAll(): Promise<Categories[]> {
    return await this.categoriesRepository.find();
  }

  async findOne({
    name,
    category_id,
  }: {
    name?: string;
    category_id?: number;
  }): Promise<Categories> {
    if (name) return await this.categoriesRepository.findOneBy({ name });
    else return await this.categoriesRepository.findOneBy({ category_id });
  }

  async update(
    category_id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return await this.categoriesRepository.update(
      category_id,
      updateCategoryDto,
    );
  }

  async remove(category_id: number): Promise<void> {
    await this.categoriesRepository.delete(category_id);
  }
}
