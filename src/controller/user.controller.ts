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
import { PaginationResponseDto, SearchDto } from 'src/common/common.dto';
import { UserReq } from 'src/common/user.decorator';
import { JwtAuthGuard } from 'src/database/dto/user/jwt-auth.guard';
import {
  ChangePassWordDto,
  DeleteUserDto,
  SignInDto,
  SignUpDto,
  UpdateDtoQuery,
  UpdateProfileDto,
  UpdateUserDto,
  UserJwtDto,
} from 'src/database/dto/user/user.dto';
import { User } from 'src/database/entity/user.entity';
import { UserService } from 'src/service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Sign up' })
  public async SignUp(@Body() user: SignUpDto) {
    return await this.userService.SignUp(user);
  }

  @Post('log-in')
  @ApiOperation({ summary: 'Log in' })
  public async Login(@Body() user: SignInDto) {
    return await this.userService.LogIn(user);
  }

  @Post('log-out')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Log out' })
  public async LogOut(@UserReq() user: UserJwtDto) {
    return await this.userService.LogOut(user);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  public async ForgotPassword(@Body() dto: ChangePassWordDto) {
    return await this.userService.ResetPassword(dto);
  }

  @Get('get-all-user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by email' })
  public async GetUserByEmail(
    @Query() dto: PaginationResponseDto,
    @UserReq() user: UserJwtDto,
  ): Promise<{ data: User[]; total: number }> {
    return await this.userService.getAll(dto, user);
  }

  @Get('get-user-by-id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by id' })
  public async GetUserByID(
    @Query() id: UpdateDtoQuery,
    @UserReq() user: UserJwtDto,
  ) {
    return await this.userService.getUserByID(id, user);
  }

  @Get('search-user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by keyword' })
  public async GetUserByKeyword(
    @Query() dto: SearchDto,
    @UserReq() user: UserJwtDto,
  ) {
    return await this.userService.getUserByKeyword(dto, user);
  }

  @Put('update-profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update profile' })
  public async UpdateProfile(
    @Query() dto: UpdateProfileDto,
    @UserReq() user: UserJwtDto,
  ) {
    return await this.userService.updateProfile(dto, user);
  }

  @Put('update-user-by-id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user by id' })
  public async UpdateUserByID(
    @Query() dto: UpdateDtoQuery,
    @Body() updateDto: UpdateUserDto,
    @UserReq() user: UserJwtDto,
  ) {
    return await this.userService.updateUserById(dto, updateDto, user);
  }

  @Delete('delete-user-by-id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user by id' })
  public async DeleteUserById(
    @Query() dto: DeleteUserDto,
    @UserReq() user: UserJwtDto,
  ) {
    return await this.userService.deleteUserById(dto, user);
  }

  @Delete('delete-user-by-ids')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user by ids' })
  public async DeleteUserByIds(
    @Body() ids: number[],
    @UserReq() user: UserJwtDto,
  ) {
    return await this.userService.deleteUserByIds(ids, user);
  }
}
