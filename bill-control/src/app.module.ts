import { Module } from '@nestjs/common';
import { BillControlModule } from './bill-control/bill-control.module';

@Module({
  imports: [BillControlModule],
})
export class AppModule {}
