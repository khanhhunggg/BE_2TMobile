import { UserJwtDto } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
export declare class HelperService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    validateAdmin(UserReq: UserJwtDto): Promise<boolean>;
}
