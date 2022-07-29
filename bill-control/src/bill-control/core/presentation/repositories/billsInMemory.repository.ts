import { Bill } from '../../domain/types/bills.type';
import { BillUpdate } from '../../domain/types/billUpdate.type';
import { IBillsRepository } from '../../application/IRepositories/IBillsRepository';

export class BillsRepositoryInMemory implements IBillsRepository {
  public bills: Bill[] = [];

  findBillsByDate(date: Date): Promise<Bill[]> {
    const billsByDate: Bill[] = [];
    this.bills.map((bill) => {
      if (bill.dueDate === date) {
        billsByDate.push(bill);
      }
    });

    return Promise.resolve(billsByDate);
  }

  updateBill(billUpdate: BillUpdate): Promise<Bill | undefined> {
    let updatedBill: Bill | undefined = undefined;
    let billIndex = 0;

    this.bills.map((bill, index) => {
      updatedBill = bill;
      if (bill.id === billUpdate.id) {
        billIndex = index;
        if (billUpdate.title)
          updatedBill = { ...updatedBill, title: billUpdate.title };

        if (billUpdate.total)
          updatedBill = { ...updatedBill, total: billUpdate.total };
        if (billUpdate.isPaid)
          updatedBill = { ...updatedBill, isPaid: billUpdate.isPaid };

        this.bills.splice(index, 1, updatedBill);
      }
    });
    return Promise.resolve(this.bills[billIndex]);
  }

  findBillById(billId: string): Promise<Bill | undefined> {
    const bill = this.bills.find((bill) => bill.id === billId);
    return Promise.resolve(bill);
  }
  deleteBillById(billId: string): Promise<Bill | undefined> {
    let deletedBill: Bill | undefined = undefined;
    this.bills.map((bill, index) => {
      if (bill.id === billId) {
        deletedBill = this.bills.splice(index, 1)[0];
      }
    });
    return Promise.resolve(deletedBill);
  }

  findBillsByUser(userId: string): Promise<Bill[]> {
    const billsByUser: Bill[] = [];

    this.bills.map((bill) => {
      if (bill.userId == userId) {
        billsByUser.push(bill);
      }
    });

    return Promise.resolve(billsByUser);
  }

  create(bill: Bill): Promise<Bill> {
    this.bills.push(bill);
    console.log(this.bills);
    return Promise.resolve(bill);
  }
}
