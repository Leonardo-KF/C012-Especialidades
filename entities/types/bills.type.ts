export type Bill = {
  title: string;
  barcode: string;
  dueDate: Date;
  total: number;
  isPaid: boolean;
  userId?: string;
};
