import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { LineDeliveryService } from './line-delivery.service';

@Module({
  imports: [ConfigModule],
  providers: [LineDeliveryService],
  exports: [LineDeliveryService],
})
export class DeliveryModule {}
