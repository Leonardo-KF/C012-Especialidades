import { Bill } from './bills.type';

export type User = {
  auth0UserId: string;
  bills: Bill[];
};
