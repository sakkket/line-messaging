import 'reflect-metadata';
import * as express from 'express';
import * as line from '@line/bot-sdk';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getLineConfig } from './config/line.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  const lineConfig = getLineConfig();

  app.use('/webhook', line.middleware(lineConfig));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const port = Number(process.env.PORT) || 3001;
  await app.listen(port);

  console.log(`LINE NestJS app running at http://localhost:${port}/webhook`);
}

bootstrap();
