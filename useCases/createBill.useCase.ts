import { BillEntity } from '../entities/bill.entity';
import { Bill } from '../entities/types/bills.type';
import { IBillsRepository } from '../repositories/IBillsRepository';
export class CreateBillUseCase {
  constructor(private readonly billsRepository: IBillsRepository) {}

  async execute(bill: Bill) {
    const newBill = new BillEntity(bill);
    return await this.billsRepository.create(newBill.validate());
  }
}
