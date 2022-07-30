import { IBillsRepository } from 'src/bill-control/core/application/IRepositories/IBillsRepository';
import { Bill } from 'src/bill-control/core/domain/types/bills.type';
import { BillUpdate } from 'src/bill-control/core/domain/types/billUpdate.type';
import { PrismaService } from '../database/prisma/prisma.service';

export class BillsRepositoryPrisma implements IBillsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(bill: Bill): Promise<Bill> {
    return await this.prisma.bill.create({
      data: {
        id: bill.id,
        title: bill.title,
        barcode: bill.barcode,
        dueDate: bill.dueDate,
        total: bill.total,
        isPaid: bill.isPaid,
        userId: bill.userId,
      },
    });
  }

  async findBillsByUser(userId: string): Promise<Bill[]> {
    return await this.prisma.bill.findMany({ where: { userId } });
  }
  async findBillById(billId: string): Promise<Bill> {
    return await this.prisma.bill.findUnique({ where: { id: billId } });
  }
  async deleteBillById(billId: string): Promise<Bill> {
    return await this.prisma.bill.delete({ where: { id: billId } });
  }
  async updateBill(data: BillUpdate): Promise<Bill> {
    return await this.prisma.bill.update({
      where: { id: data.id },
      data,
    });
  }
  async findBillsByDate(date: Date): Promise<Bill[]> {
    return await this.prisma.bill.findMany({ where: { dueDate: date } });
  }
}
