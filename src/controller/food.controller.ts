import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PaginationResponseDto } from 'src/common/common.dto';
import { UserReq } from 'src/common/user.decorator';
import {
  CreateFoodDto,
  UpdateFoodDto,
  UpdateFoodDtoIds,
} from 'src/database/dto/food/food.dto';
import { JwtAuthGuard } from 'src/database/dto/user/jwt-auth.guard';
import { UserJwtDto } from 'src/database/dto/user/user.dto';
import { FoodService } from 'src/service/food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create food' })
  public async createFood(
    @Body() food: CreateFoodDto,
    @UserReq() user: UserJwtDto,
  ) {
    return this.foodService.createNewFood(food, user);
  }

  @Get('get-all-food')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all food' })
  public async getAllFood(@Query() paginationDto: PaginationResponseDto) {
    return this.foodService.getAllFoood(paginationDto);
  }

  @Get('get-food-by-id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get food by id' })
  public async getFoodById(@Query('id') id: number) {
    return this.foodService.getFoodById(id);
  }

  @Get('get-food-by-keyword')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get food by keyword' })
  public async getFoodByKeyword(
    @Query('keyword') keyword: string,
    @Query() paginationDto: PaginationResponseDto,
  ) {
    return this.foodService.getFoodByKeyWord(keyword, paginationDto);
  }

  @Put('update-food')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update food' })
  public async updateFood(
    @Query('id') id: number,
    @Body() food: UpdateFoodDto,
    @UserReq() user: UserJwtDto,
  ) {
    return this.foodService.updateFood(id, food, user);
  }

  @Put('update-food-ids')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update food by ids' })
  public async updateFoodByIds(
    @Body() dto: UpdateFoodDtoIds,
    @UserReq() user: UserJwtDto,
  ) {
    return this.foodService.updateFoodByIds(dto, user);
  }

  @Delete('delete-food')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete food' })
  public async deleteFood(
    @Query('id') id: number,
    @UserReq() user: UserJwtDto,
  ) {
    return this.foodService.deleteFood(id, user);
  }
}
