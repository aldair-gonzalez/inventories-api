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
import { LossesService } from './losses.service';
import { CreateLossDto } from './dto/create-loss.dto';
import { UpdateLossDto } from './dto/update-loss.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@Controller('losses')
export class LossesController {
  constructor(private readonly lossesService: LossesService) {}

  @Post()
  async create(@Body() createLossDto: CreateLossDto) {
    try {
      ParseTrimFromDto(createLossDto);
      return await this.lossesService.create(createLossDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.lossesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get(':loss_id')
  async findOne(@Param('loss_id') loss_id: number) {
    try {
      if (isNaN(loss_id))
        throw new BadRequestException('loss_id must be a number');
      const loss = await this.lossesService.findOne(loss_id);
      if (!loss) throw new BadRequestException('loss not found');
      return loss;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Patch(':loss_id')
  async update(
    @Param('loss_id') loss_id: number,
    @Body() updateLossDto: UpdateLossDto,
  ) {
    try {
      if (isNaN(loss_id))
        throw new BadRequestException('loss_id should be a number');
      const loss = await this.lossesService.findOne(loss_id);
      if (!loss) throw new NotFoundException('loss not found');
      ParseTrimFromDto(updateLossDto);
      return await this.lossesService.update(loss_id, updateLossDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Delete(':loss_id')
  @HttpCode(204)
  async remove(@Param('loss_id') loss_id: number) {
    try {
      if (isNaN(loss_id))
        throw new BadRequestException('loss_id should be a number');
      const loss = await this.lossesService.findOne(loss_id);
      if (!loss) throw new NotFoundException('loss not found');
      await this.lossesService.remove(loss_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
