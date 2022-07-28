import { randomUUID } from 'crypto';
import { BillCreate } from '../types/billCreate.type';

export class BillEntity {
  private id: string;
  private barcode: string;
  public title: string;
  public dueDate: Date;
  public total: number;
  public isPaid: boolean;

  constructor(bill: BillCreate) {
    this.id = randomUUID();
    this.barcode = bill.barcode;
    this.dueDate = bill.dueDate;
    this.total = bill.total;
    this.isPaid = bill.isPaid;
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
    };
  }
}
