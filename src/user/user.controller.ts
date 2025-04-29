import { Body, Controller, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  ChangePassWordDto,
  SignInDto,
  SignUpDto,
  UpdateProfileDto,
  UserJwtDto,
} from 'src/dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserReq } from 'src/common/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Đăng kí' })
  public async SignUp(@Body() user: SignUpDto) {
    return await this.userService.SignUp(user);
  }

  @Post('log-in')
  @ApiOperation({ summary: 'Đăng nhập' })
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

  @Put('update-profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update profile' })
  public async UpdateProfile(
    @Query() dto: UpdateProfileDto,
    @UserReq() user: UserJwtDto,
  ) {
    return await this.userService.UpdateProfile(dto, user);
  }
}
