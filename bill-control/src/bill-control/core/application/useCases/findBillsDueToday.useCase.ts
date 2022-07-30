import { IBillsRepository } from '../IRepositories/IBillsRepository';

export class FindBillsDueToday {
  constructor(private readonly billsRepository: IBillsRepository) {}
  async execute() {
    const currentDay = new Date(
      new Date(Date.now()).toISOString().slice(0, 10) + 'T00:00:00.000Z',
    );
    console.log(currentDay);
    return await this.billsRepository.findBillsByDate(currentDay);
  }
}
