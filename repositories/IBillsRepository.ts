import { Bill } from '../entities/types/bills.type';

export interface IBillsRepository {
  create(bill: Bill): Promise<Bill>;
}
