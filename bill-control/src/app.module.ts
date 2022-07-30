import { Module } from '@nestjs/common';
import { BillControlModule } from './bill-control/bill-control.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [BillControlModule, MessagingModule],
})
export class AppModule {}
