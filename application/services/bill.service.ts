import { Bill } from '../../domain/types/bills.type';
import { BillUpdate } from '../../domain/types/billUpdate.type';
import { IBillService } from '../IServices/IBill.service';
import { CreateBillUseCase } from '../useCases/createBill.useCase';
import { DeleteBillUseCase } from '../useCases/deleteBill.useCase';
import { FindBillsByUserUseCase } from '../useCases/findBillsByUser.useCase';
import { FindBillsDueToday } from '../useCases/findBillsDueToday.useCase';
import { UpdateBillUseCase } from '../useCases/updateBillUseCase';

export class BillService implements IBillService {
  constructor(
    private readonly createBillUseCase: CreateBillUseCase,
    private readonly updateBillUseCase: UpdateBillUseCase,
    private readonly deleteBillUseCase: DeleteBillUseCase,
    private readonly findBillsByUserUseCase: FindBillsByUserUseCase,
    private readonly findBillsDueToday: FindBillsDueToday,
  ) {}

  async findBillsByUserId(UserId: string): Promise<Bill[]> {
    return this.findBillsByUserUseCase.execute(UserId);
  }
  async create(bill: Bill, auth0UserId: string): Promise<Bill> {
    return await this.createBillUseCase.execute(bill, auth0UserId);
  }
  async update(bill: BillUpdate, auth0UserId: string): Promise<Bill> {
    const updatedBill = await this.updateBillUseCase.execute(bill, auth0UserId);
    if (updatedBill) {
      return updatedBill;
    } else {
      throw new Error('Bill not found');
    }
  }

  async delete(billId: string, auth0UserId: string): Promise<Bill> {
    const deletedBill = await this.deleteBillUseCase.execute(
      billId,
      auth0UserId,
    );
    if (deletedBill) {
      return deletedBill;
    } else {
      throw new Error('Bill not found');
    }
  }

  async findBillsToSend() {
    return await this.findBillsDueToday.execute();
  }
}
