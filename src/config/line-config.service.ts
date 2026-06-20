import { Injectable } from '@nestjs/common';
import { getLineConfig, LineRuntimeConfig } from './line.config';

@Injectable()
export class LineConfigService {
  private readonly config: LineRuntimeConfig = getLineConfig();

  get channelSecret(): string {
    return this.config.channelSecret;
  }

  get channelAccessToken(): string {
    return this.config.channelAccessToken;
  }

  get targetUserId(): string | undefined {
    return this.config.targetUserId;
  }
}
