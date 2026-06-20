import { Module } from '@nestjs/common';
import { LineProducerService } from './line-producer.service';

@Module({
  providers: [LineProducerService],
  exports: [LineProducerService],
})
export class ProducerModule {}
