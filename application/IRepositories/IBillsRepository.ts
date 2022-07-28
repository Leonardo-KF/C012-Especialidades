import { Bill } from '../../domain/types/bills.type';
import { BillUpdate } from '../../domain/types/billUpdate.type';

export interface IBillsRepository {
  create(bill: Bill): Promise<Bill>;

  findBillsByUser(userId: string): Promise<Bill[]>;

  findBillById(billId: string): Promise<Bill | undefined>;

  deleteBillById(billId: string): Promise<Bill | undefined>;

  updateBill(bill: BillUpdate): Promise<Bill | undefined>;
}
