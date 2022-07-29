import { BillModel } from './bill.model';

export interface UserModel {
  id: string;
  auth0UserId: string;
  bills: BillModel[];
}
