import { IBillService } from '../../application/IServices/IBill.service';
import { IUserService } from '../../application/IServices/IUser.service';
import { UserModel } from '../models/user.model';

export class UserResolver {
  constructor(
    private readonly userService: IUserService,
    private readonly billService: IBillService,
  ) {}
  async me(auth0UserId: string): Promise<UserModel> {
    const user = await this.userService.findUserByAuth0Id(auth0UserId);
    const bills = await this.billService.findBillsByUserId(user.id);
    return { ...user, bills: bills };
  }
}
