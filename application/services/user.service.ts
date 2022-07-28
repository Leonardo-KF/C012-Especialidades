import { User } from '../../domain/types/user.type';
import { IUserService } from '../IServices/IUser.service';
import { UserValidation } from '../validation/userValidationservice';

export class UserService implements IUserService {
  constructor(private readonly userValidation: UserValidation) {}
  async findUserByAuth0Id(auth0Id: string): Promise<User> {
    return await this.findUserByAuth0Id(auth0Id);
  }
}
