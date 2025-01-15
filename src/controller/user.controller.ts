import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PaginationResponseDto } from 'src/common/common.dto';
import { UserReq } from 'src/common/user.decorator';
import { JwtAuthGuard } from 'src/database/dto/user/jwt-auth.guard';
import {
  GetUserByEmailDto,
  SendEmailForgotPasswordDto,
  SignInDto,
  SignUpDto,
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
  public async ForgotPassword(@Body() dto: SendEmailForgotPasswordDto) {
    return await this.userService.ResetPassword(dto);
  }

  @Get('get-user-by-email')
  @ApiOperation({ summary: 'Get user by email' })
  public async GetUserByEmail(
    @Query() dto: PaginationResponseDto,
  ): Promise<{ data: User[]; total: number }> {
    return await this.userService.getAll(dto);
  }
}
