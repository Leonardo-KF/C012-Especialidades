import { Bill } from './bills.type';

export type User = {
  id?: string;
  auth0UserId: string;
  bills: Bill[];
};
