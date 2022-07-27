import { Bill } from '../entities/types/bills.type';
import { IBillsRepository } from './IBillsRepository';

export class BillsRepositoryInMemory implements IBillsRepository {
  public bills: Bill[] = [];

  create(bill: Bill): Promise<Bill> {
    this.bills.push(bill);
    return Promise.resolve(bill);
  }
}
