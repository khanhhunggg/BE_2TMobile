import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserJwtDto } from 'src/database/dto/user/user.dto';
import { User } from 'src/database/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HelperService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async validateAdmin(UserReq: UserJwtDto) {
    const user = await this.userRepository.findOne({
      where: { UserID: Number(UserReq.id) },
    });

    if (!user) {
      throw new BadRequestException('USER_NOT_FOUND');
    }

    if (user.Role !== 'Admin') {
      throw new ForbiddenException('USER_NOT_ADMIN');
    }

    return true;
  }
}
