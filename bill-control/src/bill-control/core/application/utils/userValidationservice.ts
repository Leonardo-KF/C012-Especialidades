import { UserEntity } from '../../domain/entities/user.entity';
import { IBillsRepository } from '../IRepositories/IBillsRepository';
import { IUsersRepository } from '../IRepositories/IUsersRepository';

export class UserValidation {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly billsRepository: IBillsRepository,
  ) {}
  async userExist(auth0UserId: string) {
    let user = await this.usersRepository.findUserByAuth0Id(auth0UserId);
    if (!user) {
      const newUser = new UserEntity({ auth0UserId: auth0UserId, bills: [] });
      user = await this.usersRepository.createUser(newUser.validate());
    }
    return user;
  }

  async findUserById(id: string) {
    return await this.usersRepository.findUserById(id);
  }
  async userCanModifyBill(auth0UserId: string, billId: string) {
    const user = await this.userExist(auth0UserId);
    const bill = await this.billsRepository.findBillById(billId);

    if (user.id !== bill?.userId) {
      throw new Error('You can not modify this bill');
    }
  }
}
