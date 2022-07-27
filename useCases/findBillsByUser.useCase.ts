import { IBillsRepository } from '../repositories/IBillsRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { UserExist } from '../services/validação/userExist.service';

export class FindBillsByUserUseCase {
  constructor(
    private readonly billsRepository: IBillsRepository,
    private readonly usersExist: UserExist,
  ) {}
  async execute(auth0UserId: string) {
    const user = await this.usersExist.execute(auth0UserId);
    return await this.billsRepository.findBillsByUser(user.id ?? '');
  }
}
