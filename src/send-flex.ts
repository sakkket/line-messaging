import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LineConfigService } from './config/line-config.service';
import { LineDeliveryService } from './delivery/line-delivery.service';
import { LineProducerService } from './producer/line-producer.service';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  try {
    const config = app.get(LineConfigService);
    const delivery = app.get(LineDeliveryService);
    const producer = app.get(LineProducerService);
    const targetUserId = config.targetUserId;

    if (!targetUserId || targetUserId === 'your_line_user_id_here') {
      throw new Error(
        'TARGET_USER_ID is not set. Start the webhook, add your bot as a LINE friend, then send it a message.',
      );
    }

    await delivery.push(targetUserId, [producer.createFlexPushMessage()]);
  } finally {
    await app.close();
  }
}

main().catch((error) => {
  console.error('Failed to send flex message:', error);
  process.exit(1);
});
