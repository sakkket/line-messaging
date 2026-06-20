import 'dotenv/config';
import type { MiddlewareConfig } from '@line/bot-sdk';

export interface LineRuntimeConfig extends MiddlewareConfig {
  channelAccessToken: string;
  targetUserId?: string;
}

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required`);
  }

  return value;
}

export function getLineConfig(): LineRuntimeConfig {
  return {
    channelSecret: requiredEnv('CHANNEL_SECRET'),
    channelAccessToken: requiredEnv('CHANNEL_ACCESS_TOKEN'),
    targetUserId: process.env.TARGET_USER_ID,
  };
}
