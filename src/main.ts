import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { VercelRequest, VercelResponse } from '@vercel/node';
import 'reflect-metadata';

let server: any;
let isReady = false;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.set('trust proxy', true);
  setupSwagger(app);

  await app.listen(process.env.PORT || 3303);
  server = app.getHttpServer();
  isReady = true;
  return app;
}

export default async function handler(req, res) {
  try {
    if (!isReady) await bootstrap();
    return server(req, res);
  } catch (err) {
    console.error('ERROR in handler:', err);
    res.status(500).send({ error: err.message });
  }
}

bootstrap();
