import { Bill } from './types/bills.type';
import { User } from './types/user.type';
import { randomUUID } from 'crypto';

export class UserEntity {
  private id: string;
  private auth0UserId: string;
  public bills: Bill[];

  constructor(user: User) {
    this.id = randomUUID();
    this.auth0UserId = user.auth0UserId;
    this.bills = user.bills;
  }

  create() {
    if (this.auth0UserId.length < 10) {
      throw new Error('invalid auth0UserId credentials');
    }

    return { id: this.id, auth0UserId: this.auth0UserId, bills: this.bills };
  }
}
