import { BillCreate } from '../../domain/types/billCreate.type';
import { Bill } from '../../domain/types/bills.type';
import { BillUpdate } from '../../domain/types/billUpdate.type';

export interface IBillService {
  create(bill: BillCreate, auth0UserId: string): Promise<Bill>;

  update(bill: BillUpdate, auth0UserId: string): Promise<Bill>;

  delete(billId: string, auth0UserId: string): Promise<Bill>;

  findBillsByUserId(userId: string): Promise<Bill[]>;
}
