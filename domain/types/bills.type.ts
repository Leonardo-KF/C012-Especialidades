export type Bill = {
  id: string;
  title: string;
  barcode: string;
  dueDate: Date;
  total: number;
  isPaid: boolean;
  userId?: string;
};
