import { User } from '../../domain/types/user.type';
import { IUserService } from '../IServices/IUser.service';
import { UserValidation } from '../utils/userValidationservice';

export class UserService implements IUserService {
  constructor(private readonly userValidation: UserValidation) {}
  findUserById(id: string): Promise<User> {
    return this.userValidation.findUserById(id);
  }
  async findUserByAuth0Id(auth0Id: string): Promise<User> {
    return await this.userValidation.userExist(auth0Id);
  }
}
