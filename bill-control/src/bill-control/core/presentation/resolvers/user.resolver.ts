import { IUserService } from '../../application/IServices/IUser.service';
import { UserModel } from '../models/user.model';

export class UserResolver {
  constructor(private readonly userService: IUserService) {}
  async me(auth0UserId: string): Promise<UserModel> {
    const user = await this.userService.findUserByAuth0Id(auth0UserId);
    return user;
  }
}
