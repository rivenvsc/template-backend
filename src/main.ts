import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();

const createNestServer = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  app.enableCors({ origin: '*' }); // Cho phép tất cả origin truy cập
  await app.init();
};

createNestServer(expressApp);

// ✅ Export Express instance để Vercel dùng làm handler
export default expressApp;
