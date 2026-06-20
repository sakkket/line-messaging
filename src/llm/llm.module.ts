import { Module } from '@nestjs/common';
import { LlmResponseService } from './llm-response.service';

@Module({
  providers: [LlmResponseService],
  exports: [LlmResponseService],
})
export class LLMModule {}
