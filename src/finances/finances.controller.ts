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
import { FinancesService } from './finances.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
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
import { BadRequestExample, FinanceExample } from 'src/utils/swagger.examples';
import {
  notFoundResponseExample,
  deletedResponseExample,
} from '../utils/swagger.examples';

const answerExamples = {
  NotFoundResponseExample: notFoundResponseExample({ objectName: 'finance' }),
  DeletedResponseExample: deletedResponseExample({ objectName: 'finance' }),
};

@ApiTags('finances')
@Controller('finances')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @ApiOperation({ summary: 'Create finance' })
  @ApiCreatedResponse({
    description: 'The finance has been successfully created.',
    schema: { example: FinanceExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @Post()
  async create(@Body() createFinanceDto: CreateFinanceDto) {
    try {
      ParseTrimFromDto(createFinanceDto);
      return await this.financesService.create(createFinanceDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all finances' })
  @ApiOkResponse({
    description: 'The finance has been successfully retrieved.',
    schema: { example: [FinanceExample, FinanceExample] },
  })
  @Get()
  async findAll() {
    try {
      return await this.financesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get a finance' })
  @ApiOkResponse({
    description: 'The finance has been successfully retrieved.',
    schema: { example: FinanceExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Get(':finance_id')
  async findOne(@Param('finance_id') finance_id: number) {
    try {
      if (isNaN(finance_id))
        throw new BadRequestException('finance_id should be a number');
      const finance = await this.financesService.findOne(finance_id);
      if (!finance) throw new NotFoundException('finance not found');
      return finance;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update a finance' })
  @ApiOkResponse({
    description: 'The finance has been successfully updated.',
    schema: { example: FinanceExample },
  })
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Patch(':finance_id')
  async update(
    @Param('finance_id') finance_id: number,
    @Body() updateFinanceDto: UpdateFinanceDto,
  ) {
    try {
      if (isNaN(finance_id))
        throw new BadRequestException('finance_id should be a number');
      const finance = await this.financesService.findOne(finance_id);
      if (!finance) throw new NotFoundException('finance not found');
      ParseTrimFromDto(updateFinanceDto);
      return await this.financesService.update(finance_id, updateFinanceDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete a finance' })
  @ApiNoContentResponse(answerExamples.DeletedResponseExample)
  @ApiBadRequestResponse(BadRequestExample)
  @ApiNotFoundResponse(answerExamples.NotFoundResponseExample)
  @Delete(':finance_id')
  @HttpCode(204)
  async remove(@Param('finance_id') finance_id: number) {
    try {
      if (isNaN(finance_id))
        throw new BadRequestException('finance_id should be a number');
      const finance = await this.financesService.findOne(finance_id);
      if (!finance) throw new NotFoundException('finance not found');
      await this.financesService.remove(finance_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
