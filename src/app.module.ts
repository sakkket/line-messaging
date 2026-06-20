import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConsumerModule } from './consumer/consumer.module';
import { DeliveryModule } from './delivery/delivery.module';
import { ProducerModule } from './producer/producer.module';

@Module({
  imports: [ConfigModule, DeliveryModule, ProducerModule, ConsumerModule],
})
export class AppModule {}
