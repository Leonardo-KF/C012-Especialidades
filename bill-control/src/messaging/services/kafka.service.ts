import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService
  extends ClientKafka
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    console.log(configService.get('KAFKA_BROKERS'));
    super({
      client: {
        clientId: 'billControl',
        brokers: [configService.get('KAFKA_BROKERS')],
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
  async onModuleInit() {
    await this.connect();
  }
}
