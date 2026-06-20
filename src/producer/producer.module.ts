import { Module } from '@nestjs/common';
import { LineProducerService } from './line-producer.service';
import { LLMModule } from '../llm/llm.module';

@Module({
  providers: [LineProducerService],
  exports: [LineProducerService],
  imports: [LLMModule]
})
export class ProducerModule {}
