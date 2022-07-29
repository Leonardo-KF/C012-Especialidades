import { Bill } from '../types/bills.type';
import { randomUUID } from 'crypto';
import { CreateUser } from '../types/userCreate';

export class UserEntity {
  private id: string;
  private auth0UserId: string;
  public bills: Bill[];

  constructor(user: CreateUser) {
    this.id = randomUUID();
    this.auth0UserId = user.auth0UserId;
    this.bills = user.bills;
  }

  validate() {
    if (this.auth0UserId.length < 10) {
      throw new Error('invalid auth0UserId credentials');
    }
    return { id: this.id, auth0UserId: this.auth0UserId, bills: this.bills };
  }
}
