import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Products> {
    return await this.productsRepository.save(createProductDto);
  }

  async findAll(): Promise<Products[]> {
    return await this.productsRepository.find({
      relations: ['category', 'vendor'],
    });
  }

  async findOne(product_id: number): Promise<Products> {
    return await this.productsRepository.findOne({
      where: { product_id },
      relations: ['category', 'vendor'],
    });
  }

  async update(
    product_id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    return await this.productsRepository.update(product_id, updateProductDto);
  }

  async remove(product_id: number): Promise<void> {
    await this.productsRepository.delete(product_id);
  }
}
