import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketAdapter } from './socket-adapter';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useWebSocketAdapter(new SocketAdapter(app));
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
