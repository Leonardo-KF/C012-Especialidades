import { Bill } from '../entities/types/bills.type';
import { IBillsRepository } from './IBillsRepository';

export class BillsRepositoryInMemory implements IBillsRepository {
  public bills: Bill[] = [];
  findBillsByUser(userId: string): Promise<Bill[]> {
    const billsByUser: Bill[] = [];
    console.log('find', userId);
    this.bills.map((bill) => {
      console.log(bill.userId);
      if (bill.userId == userId) {
        billsByUser.push(bill);
      }
    });

    return Promise.resolve(billsByUser);
  }

  create(bill: Bill): Promise<Bill> {
    this.bills.push(bill);
    return Promise.resolve(bill);
  }
}
