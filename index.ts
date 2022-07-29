import { BillService } from './application/services/bill.service';
import { UserService } from './application/services/user.service';
import { CreateBillUseCase } from './application/useCases/createBill.useCase';
import { DeleteBillUseCase } from './application/useCases/deleteBill.useCase';
import { FindBillsByUserUseCase } from './application/useCases/findBillsByUser.useCase';
import { FindBillsDueToday } from './application/useCases/findBillsDueToday.useCase';
import { UpdateBillUseCase } from './application/useCases/updateBillUseCase';
import { UserValidation } from './application/utils/userValidationservice';
import { BillsRepositoryInMemory } from './presentation/repositories/billsInMemory.repository';
import { UsersRepositoryInMemory } from './presentation/repositories/userInMemory.repository';
import { BillsResolver } from './presentation/resolvers/bills.resolver';
import { UserResolver } from './presentation/resolvers/user.resolver';

async function test() {
  // infra
  const billsRepository = new BillsRepositoryInMemory();
  const usersRepository = new UsersRepositoryInMemory();
  // application business rules
  const userValidation = new UserValidation(usersRepository, billsRepository);
  const findBillsDueDate = new FindBillsDueToday(billsRepository);
  const findBillsByUserUseCase = new FindBillsByUserUseCase(billsRepository);
  const deleteBillUseCase = new DeleteBillUseCase(
    billsRepository,
    userValidation,
  );
  const updateBillUseCase = new UpdateBillUseCase(
    billsRepository,
    userValidation,
  );
  const createBillUseCase = new CreateBillUseCase(
    billsRepository,
    userValidation,
  );
  const billService = new BillService(
    createBillUseCase,
    updateBillUseCase,
    deleteBillUseCase,
    findBillsByUserUseCase,
    findBillsDueDate,
  );
  const userService = new UserService(userValidation);

  //presentation
  const userResolver = new UserResolver(userService, billService);
  const billResolver = new BillsResolver(billService);

  // SOLID, DRY, YAGNI, KISS

  const bill1 = await billResolver.createBill(
    {
      barcode: '1234532534 35325',
      dueDate: new Date(Date.now() + 100),
      isPaid: false,
      title: 'Conta De luz',
      total: 150,
    },
    'auth012345',
  );
  const bill2 = await billResolver.createBill(
    {
      barcode: '123453253452725',
      dueDate: new Date(Date.now() + 100),
      isPaid: false,
      title: 'Conta De luz',
      total: 200,
    },
    'auth012345',
  );

  const updatedBill = await billResolver.updateBill(
    { title: 'Conta De internet' },
    bill2.id,
    'auth012345',
  );

  const deletedBill = await billResolver.deleteBill(bill1.id, 'auth012345');

  const userBills = await userResolver.me('auth012345');
  console.log(userBills);
}

test();
