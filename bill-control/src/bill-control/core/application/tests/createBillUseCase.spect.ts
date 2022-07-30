import { Bill } from '../../domain/types/bills.type';
import { BillUpdate } from '../../domain/types/billUpdate.type';
import { User } from '../../domain/types/user.type';
import { IBillsRepository } from '../IRepositories/IBillsRepository';
import { IUsersRepository } from '../IRepositories/IUsersRepository';
import { CreateBillUseCase } from '../useCases/createBill.useCase';
import { UserValidation } from '../utils/userValidationservice';

class usersRespositorySpy implements IUsersRepository {
  private users: User[];
  findUserByAuth0Id(auth0UserId: string): Promise<User | undefined> {
    let userInMemory: User;
    this.users.map((user) => {
      if (user.auth0UserId === auth0UserId) {
        userInMemory = user;
      }
    });
    return Promise.resolve(userInMemory);
  }
  createUser(user: User): Promise<User> {
    this.users.push(user);
    return Promise.resolve(user);
  }
  findUserById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}

class billsRepositorySpy implements IBillsRepository {
  public bills: Bill[];
  create(bill: Bill): Promise<Bill> {
    this.bills.push(bill);
    return Promise.resolve(bill);
  }
  findBillsByUser(userId: string): Promise<Bill[]> {
    throw new Error('Method not implemented.');
  }
  findBillById(billId: string): Promise<Bill> {
    throw new Error('Method not implemented.');
  }
  deleteBillById(billId: string): Promise<Bill> {
    throw new Error('Method not implemented.');
  }
  updateBill(bill: BillUpdate): Promise<Bill> {
    throw new Error('Method not implemented.');
  }
  findBillsByDate(date: Date): Promise<Bill[]> {
    throw new Error('Method not implemented.');
  }
}

describe('CreateBillUseCase', () => {
  it('should be able to create a new bill', async () => {
    const usersRepository = new usersRespositorySpy();
    const billsRepository = new billsRepositorySpy();
    const userValidation = new UserValidation(usersRepository, billsRepository);
    const createBillUseCase = new CreateBillUseCase(
      billsRepository,
      userValidation,
    );

    const newBill = await createBillUseCase.execute(
      {
        barcode: '124838957235723',
        dueDate: new Date('2022-07-30T09:54:33Z'),
        isPaid: false,
        title: 'testBill',
        total: 500,
        userId: 'auth012456',
      },
      'auth012456',
    );

    expect(billsRepository.bills).toContain(newBill);
  });
});
