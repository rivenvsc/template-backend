import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({ origin: '*' }); // Cho phép tất cả origin
  await app.init();
}
bootstrap();

// ✅ Export mặc định cho Vercel handler
export default server;
