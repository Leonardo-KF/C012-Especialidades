import { randomUUID } from 'crypto';
import { Bill } from './types/bills.type';

export class BillEntity {
  private id: string;
  private barcode: string;
  public title: string;
  public dueDate: Date;
  public total: number;
  public isPaid: boolean;
  private userId: string;

  constructor(bill: Bill) {
    this.id = randomUUID();
    this.barcode = bill.barcode;
    this.dueDate = bill.dueDate;
    this.total = bill.total;
    this.isPaid = bill.isPaid;
    this.userId = bill.userId;
    this.title = bill.title;
  }

  validate() {
    if (this.total < 1) {
      throw new Error('Invalid total please send a total greater than 1');
    }
    if (this.dueDate < new Date(Date.now())) {
      throw new Error('Invalid due date');
    }
    if (this.barcode.length < 10) {
      throw new Error('Invalid barcode please send a barcode valid');
    }

    return {
      id: this.id,
      title: this.title,
      barcode: this.barcode,
      dueDate: this.dueDate,
      total: this.total,
      isPaid: this.isPaid,
      userId: this.userId,
    };
  }
}
