import { BillEntity } from '../entities/bill.entity';
import { Bill } from '../entities/types/bills.type';
import { IBillsRepository } from '../repositories/IBillsRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { UserExist } from '../services/validação/userExist.service';
import { CreateUserUseCase } from './createUserUseCase';
export class CreateBillUseCase {
  constructor(
    private readonly billsRepository: IBillsRepository,
    private readonly userExist: UserExist,
  ) {}

  async execute(bill: Bill, auth0UserId: string) {
    const user = await this.userExist.execute(auth0UserId);
    const newBill = new BillEntity(bill);
    return await this.billsRepository.create({
      ...newBill.validate(),
      userId: user.id ?? '',
    });
  }
}
