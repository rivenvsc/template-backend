import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import * as express from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const server = express();
let cachedApp: express.Express;

// Tạo và cache instance Nest để tránh khởi động lại mỗi lần request
async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors({ origin: '*' });
    await app.init();
    cachedApp = server;
  }
  return cachedApp;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await bootstrap();
  app(req, res);
}
