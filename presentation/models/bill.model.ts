export interface BillModel {
  id: string;
  title: string;
  dueDate: Date;
  total: number;
  isPaid: boolean;
  barcode: string;
}
