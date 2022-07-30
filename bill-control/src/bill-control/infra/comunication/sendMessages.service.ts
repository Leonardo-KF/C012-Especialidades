import { Cron } from '@nestjs/schedule';
import { BillService } from 'src/bill-control/core/application/services/bill.service';
import { UserService } from 'src/bill-control/core/application/services/user.service';
import { KafkaService } from 'src/messaging/services/kafka.service';

export class SendMessages {
  constructor(
    private readonly billsService: BillService,
    private readonly userService: UserService,
    private readonly kafka: KafkaService,
  ) {}

  //(segundo, minuto, hora, dia, mes, dia da semana )
  @Cron('* * 9 * * *')
  async sendBills() {
    const bills = await this.billsService.findBillsToSend();
    console.log(bills);
    bills.map(async (bill) => {
      const user = await this.userService.findUserById(bill.userId);
      if (!bill.isPaid) {
        this.kafka.emit('billsControl.DueDateBill', {
          user: {
            auth0UserId: user.auth0UserId,
          },
          bill: {
            title: bill.title,
            total: bill.total,
            barcode: bill.barcode,
          },
        });
      }
    });
  }
}
