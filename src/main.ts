import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketAdapter } from './socket-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useWebSocketAdapter(new SocketAdapter(app));
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
