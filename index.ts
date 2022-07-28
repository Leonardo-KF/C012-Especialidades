import { BillService } from './application/services/bill.service';
import { UserService } from './application/services/user.service';
import { CreateBillUseCase } from './application/useCases/createBill.useCase';
import { DeleteBillUseCase } from './application/useCases/deleteBill.useCase';
import { FindBillsByUserUseCase } from './application/useCases/findBillsByUser.useCase';
import { UpdateBillUseCase } from './application/useCases/updateBillUseCase';
import { UserValidation } from './application/validation/userValidationservice';
import { BillsRepositoryInMemory } from './presentation/repositories/billsInMemory.repository';
import { UsersRepositoryInMemory } from './presentation/repositories/userInMemory.repository';
import { BillsResolver } from './presentation/resolvers/bills.resolver';
import { UserResolver } from './presentation/resolvers/user.resolver';

async function test() {
  // adapters
  const billsRepository = new BillsRepositoryInMemory();
  const usersRepository = new UsersRepositoryInMemory();

  const userValidation = new UserValidation(usersRepository, billsRepository);

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
  //application business
  const billService = new BillService(
    createBillUseCase,
    updateBillUseCase,
    deleteBillUseCase,
    findBillsByUserUseCase,
  );
  const userService = new UserService(userValidation);

  //adapters
  const userResolver = new UserResolver(userService, billService);
  const billResolver = new BillsResolver(billService);

  await billResolver.createBill();
}

test();
