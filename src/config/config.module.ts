import { Module } from '@nestjs/common';
import { LineConfigService } from './line-config.service';

@Module({
  providers: [LineConfigService],
  exports: [LineConfigService],
})
export class ConfigModule {}
