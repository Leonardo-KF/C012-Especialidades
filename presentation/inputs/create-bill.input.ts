export interface CreateBillInput {
  barcode: string;
  dueDate: Date;
  total: number;
  isPaid: boolean;
  title: string;
}
