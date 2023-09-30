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
import {
  BadRequestExample,
  LossesExample,
  deletedResponseExample,
  notFoundResponseExample,
} from 'src/utils/swagger.examples';
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
  NotFoundResponseExample: notFoundResponseExample({
    objectName: 'losses',
  }),
  DeletedResponseExample: deletedResponseExample({
    objectName: 'losses',
  }),
};

@ApiTags('losses')
@Controller('losses')
export class LossesController {
  constructor(private readonly lossesService: LossesService) {}

  @ApiOperation({ summary: 'Create a losses details' })
  @ApiCreatedResponse({
    description: 'The losses details has been succesfully created',
    schema: { example: LossesExample },
  })
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

  @ApiOperation({ summary: 'Get all losses details' })
  @ApiOkResponse({
    description: 'The losses details have been succesfully retrieved',
    schema: { example: [LossesExample, LossesExample] },
  })
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

  @ApiOperation({ summary: 'Get a losses details' })
  @ApiOkResponse({
    description: 'The losses details has been succesfully retrieved',
    schema: { example: LossesExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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

  @ApiOperation({ summary: 'Update a losses details' })
  @ApiOkResponse({
    description: 'The losses details has been succesfully updated',
    schema: { example: LossesExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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

  @ApiOperation({ summary: 'Delete a losses details' })
  @ApiNoContentResponse(answerExamples.DeletedResponseExample)
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
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
