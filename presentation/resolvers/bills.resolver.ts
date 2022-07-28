import { IBillService } from '../../application/IServices/IBill.service';
import { CreateBillInput } from '../inputs/create-bill.input';
import { UpdateBillInput } from '../inputs/update-bill.input';
import { BillModel } from '../models/bill.model';

export class BillsResolver {
  constructor(private readonly billService: IBillService) {}

  async createBill(
    bill: CreateBillInput,
    auth0UserId: string,
  ): Promise<BillModel> {
    return await this.billService.create(bill, auth0UserId);
  }

  async updateBill(
    bill: UpdateBillInput,
    billId: string,
    auth0UserId: string,
  ): Promise<BillModel> {
    return await this.billService.update({ ...bill, id: billId }, auth0UserId);
  }

  async deleteBill(billId: string, auth0UserId: string): Promise<BillModel> {
    return await this.billService.delete(billId, auth0UserId);
  }
}
