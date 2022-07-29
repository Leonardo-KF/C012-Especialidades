import { IBillsRepository } from '../IRepositories/IBillsRepository';

export class FindBillsByUserUseCase {
  constructor(private readonly billsRepository: IBillsRepository) {}
  async execute(userId: string) {
    return await this.billsRepository.findBillsByUser(userId);
  }
}
