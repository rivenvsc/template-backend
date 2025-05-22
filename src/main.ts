import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();

export const createNestServer = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  app.enableCors({ origin: '*' });
  await app.init();
};

createNestServer(expressApp);

export const handler = expressApp;
