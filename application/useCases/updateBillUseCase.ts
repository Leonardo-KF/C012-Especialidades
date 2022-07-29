import { BillUpdate } from '../../domain/types/billUpdate.type';
import { IBillsRepository } from '../IRepositories/IBillsRepository';
import { UserValidation } from '../utils/userValidationservice';

export class UpdateBillUseCase {
  constructor(
    private readonly billsRepository: IBillsRepository,
    private readonly userValidation: UserValidation,
  ) {}
  async execute(updatedBill: BillUpdate, auth0UserId: string) {
    await this.userValidation.userCanModifyBill(auth0UserId, updatedBill.id);
    return await this.billsRepository.updateBill(updatedBill);
  }
}
