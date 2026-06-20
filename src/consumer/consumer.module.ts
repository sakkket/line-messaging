import { Module } from '@nestjs/common';
import { DeliveryModule } from '../delivery/delivery.module';
import { ProducerModule } from '../producer/producer.module';
import { LineWebhookController } from './line-webhook.controller';

@Module({
  imports: [DeliveryModule, ProducerModule],
  controllers: [LineWebhookController],
})
export class ConsumerModule {}
