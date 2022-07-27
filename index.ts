import { UserEntity } from './entities/user.entity';
import { BillsRepositoryInMemory } from './repositories/billsInMemory.repository';
import { UsersRepositoryInMemory } from './repositories/userInMemory.repository';
import { UserExist } from './services/validação/userExist.service';
import { CreateBillUseCase } from './useCases/createBill.useCase';
import { CreateUserUseCase } from './useCases/createUserUseCase';
import { FindBillsByUserUseCase } from './useCases/findBillsByUser.useCase';

async function test() {
  const billsRepository = new BillsRepositoryInMemory();
  const usersRepository = new UsersRepositoryInMemory();

  const userExist = new UserExist(usersRepository);

  const createUser = new CreateUserUseCase(usersRepository);
  const createBill = new CreateBillUseCase(billsRepository, userExist);

  const user = await createUser.execute({
    auth0UserId: 'auth0id124',
    bills: [],
  });

  await createBill.execute(
    {
      barcode: '12423123 129932828723',
      dueDate: new Date(Date.now() + 13563463),
      isPaid: false,
      title: 'Uma nova conta',
      total: 50,
    },
    user.auth0UserId,
  );

  const findBillsByUser = new FindBillsByUserUseCase(
    billsRepository,
    userExist,
  );

  console.log(await findBillsByUser.execute(user.auth0UserId));
}

test();
