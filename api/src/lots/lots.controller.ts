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
import { LotsService } from './lots.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { ParseTrimFromDto } from 'src/utils/trim';
import {
  notFoundResponseExample,
  deletedResponseExample,
  LotExample,
  BadRequestExample,
} from '../utils/swagger.examples';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

const answerExamples = {
  NotFoundResponseExample: notFoundResponseExample({ objectName: 'lots' }),
  DeletedResponseExample: deletedResponseExample({ objectName: 'lots' }),
};

@ApiTags('lots')
@Controller('lots')
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}

  @ApiOperation({ summary: 'Create a lot' })
  @ApiCreatedResponse({
    description: 'The lot has been successfully created.',
    schema: { example: LotExample },
  })
  @Post()
  async create(@Body() createLotDto: CreateLotDto) {
    try {
      ParseTrimFromDto(createLotDto);
      return await this.lotsService.create(createLotDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all lots' })
  @ApiOkResponse({
    description: 'The lots has been successfully retrieved',
    schema: { example: [LotExample, LotExample] },
  })
  @Get()
  async findAll() {
    try {
      return await this.lotsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get a lot' })
  @ApiOkResponse({
    description: 'The los has been successfully retrieved.',
    schema: { example: LotExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Get(':lot_id')
  async findOne(@Param('lot_id') lot_id: number) {
    try {
      if (isNaN(lot_id))
        throw new BadRequestException('lot_id should be a number');
      const lot = await this.lotsService.findOne(lot_id);
      if (!lot) throw new NotFoundException('lot not found');
      return lot;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update a lot' })
  @ApiOkResponse({
    description: 'The lot has been successfully updated.',
    schema: { example: LotExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Patch(':lot_id')
  async update(
    @Param('lot_id') lot_id: number,
    @Body() updateLotDto: UpdateLotDto,
  ) {
    try {
      if (isNaN(lot_id))
        throw new BadRequestException('lot_id should be a number');
      const lot = await this.lotsService.findOne(lot_id);
      if (!lot) throw new NotFoundException('lot not found');
      ParseTrimFromDto(updateLotDto);
      return await this.lotsService.update(lot_id, updateLotDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete a lot' })
  @ApiNoContentResponse(answerExamples.DeletedResponseExample)
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Delete(':lot_id')
  @HttpCode(204)
  async remove(@Param('lot_id') lot_id: number) {
    try {
      if (isNaN(lot_id))
        throw new BadRequestException('lot_id should be a number');
      const lot = await this.lotsService.findOne(lot_id);
      if (!lot) throw new NotFoundException('lot not found');
      await this.lotsService.remove(lot_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
