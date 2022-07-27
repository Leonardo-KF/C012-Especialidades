import { UserEntity } from './entities/user.entity';
import { BillsRepositoryInMemory } from './repositories/billsInMemory.repository';
import { CreateBillUseCase } from './useCases/createBill.useCase';

function test(): string {
  return 'hello world';
}
const billsRepository = new BillsRepositoryInMemory();

const user = new UserEntity({ auth0UserId: 'teste12345', bills: [] });

const createBill = new CreateBillUseCase(billsRepository);

createBill.execute({
  barcode: '12423123',
  dueDate: new Date(Date.now() + 1),
  isPaid: false,
  title: 'Uma nova conta',
  total: 50,
  userId: user.create().id,
});

console.log(billsRepository.bills);

console.log(test());
