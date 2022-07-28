export type BillUpdate = {
  id: string;
  title?: string;
  dueDate?: Date;
  total?: number;
  isPaid?: boolean;
};
