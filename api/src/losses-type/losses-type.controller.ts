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
} from '@nestjs/common';
import { LossesTypeService } from './losses-type.service';
import { CreateLossesTypeDto } from './dto/create-losses-type.dto';
import { UpdateLossesTypeDto } from './dto/update-losses-type.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@Controller('losses-type')
export class LossesTypeController {
  constructor(private readonly lossesTypeService: LossesTypeService) {}

  @Post()
  async create(@Body() createLossesTypeDto: CreateLossesTypeDto) {
    try {
      ParseTrimFromDto(createLossesTypeDto);
      return await this.lossesTypeService.create(createLossesTypeDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.lossesTypeService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get(':loss_type_id')
  async findOne(@Param('loss_type_id') loss_type_id: number) {
    try {
      if (isNaN(loss_type_id))
        throw new BadRequestException('loss_type_id must be a number');
      const loss_type = await this.lossesTypeService.findOne(loss_type_id);
      if (!loss_type) throw new BadRequestException('loss_type not found');
      return loss_type;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Patch(':loss_type_id')
  async update(
    @Param('loss_type_id') loss_type_id: number,
    @Body() updateLossesTypeDto: UpdateLossesTypeDto,
  ) {
    try {
      if (isNaN(loss_type_id))
        throw new BadRequestException('loss_type_id should be a number');
      const loss_type = await this.lossesTypeService.findOne(loss_type_id);
      if (!loss_type) throw new NotFoundException('loss_type not found');
      ParseTrimFromDto(updateLossesTypeDto);
      return await this.lossesTypeService.update(
        loss_type_id,
        updateLossesTypeDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Delete(':loss_type_id')
  async remove(@Param('loss_type_id') loss_type_id: number) {
    try {
      if (isNaN(loss_type_id))
        throw new BadRequestException('loss_type_id should be a number');
      const loss_type = await this.lossesTypeService.findOne(loss_type_id);
      if (!loss_type) throw new NotFoundException('loss_type not found');
      await this.lossesTypeService.remove(loss_type_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
