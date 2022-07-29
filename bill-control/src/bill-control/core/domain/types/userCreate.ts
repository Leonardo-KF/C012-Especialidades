import { Bill } from './bills.type';

export type CreateUser = {
  auth0UserId: string;
  bills: Bill[];
};
