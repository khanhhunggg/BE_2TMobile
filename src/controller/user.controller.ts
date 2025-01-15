import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SignUpDto } from 'src/database/dto/auth/auth.dto';
import { UserService } from 'src/service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Sign up' })
  public async SignUp(@Body() user: SignUpDto) {
    return await this.userService.SignUp(user);
  }
}
