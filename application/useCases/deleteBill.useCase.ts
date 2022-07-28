import { IBillsRepository } from '../IRepositories/IBillsRepository';
import { UserValidation } from '../validation/userValidationservice';

export class DeleteBillUseCase {
  constructor(
    private readonly billsRepository: IBillsRepository,
    private readonly userValidation: UserValidation,
  ) {}
  async execute(billId: string, auth0UserId: string) {
    const user = await this.userValidation.userExist(auth0UserId);
    const bill = await this.billsRepository.findBillById(billId);
    if (!bill) {
      throw new Error('Bill not found');
    }
    if (bill.userId !== user.id) {
      throw new Error('You can not delete this bill');
    }
    return await this.billsRepository.deleteBillById(billId);
  }
}
