import { BillEntity } from '../../domain/entities/bill.entity';
import { BillCreate } from '../../domain/types/billCreate.type';
import { IBillsRepository } from '../IRepositories/IBillsRepository';
import { UserValidation } from '../validation/userValidationservice';

export class CreateBillUseCase {
  constructor(
    private readonly billsRepository: IBillsRepository,
    private readonly userValidation: UserValidation,
  ) {}

  async execute(bill: BillCreate, auth0UserId: string) {
    const user = await this.userValidation.userExist(auth0UserId);
    const newBill = new BillEntity(bill);
    return await this.billsRepository.create({
      ...newBill.validate(),
      userId: user.id ?? '',
    });
  }
}
