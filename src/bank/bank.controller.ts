import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BankService } from './bank.service';
import {
  CreateBankDto,
  UpdateBankDto,
  GetBankByIdDto,
  SearchBankDto,
} from '../dto/bank.dto';

@ApiTags('Bank')
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bank account' })
  @ApiResponse({
    status: 201,
    description: 'Bank account created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createBank(@Body() createBankDto: CreateBankDto) {
    return await this.bankService.doCreateBank(createBankDto);
  }

  @Put()
  @ApiOperation({ summary: 'Update a bank account' })
  @ApiResponse({
    status: 200,
    description: 'Bank account updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateBank(@Body() updateBankDto: UpdateBankDto) {
    return await this.bankService.doUpdateBank(updateBankDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a bank account by ID' })
  @ApiResponse({ status: 200, description: 'Bank account found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async getBankById(@Param('id') id: string) {
    return await this.bankService.doGetBankById({
      bank_account_id: Number(id),
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all bank accounts with pagination and search' })
  @ApiResponse({ status: 200, description: 'List of bank accounts' })
  async getAllBanks(@Query() searchParams: SearchBankDto) {
    return await this.bankService.doGetAllBanks(searchParams);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bank account' })
  @ApiResponse({
    status: 200,
    description: 'Bank account deleted successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async deleteBank(@Param('id') id: string) {
    return await this.bankService.doDeleteBank(Number(id));
  }
}
