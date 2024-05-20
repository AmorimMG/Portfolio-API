import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  setupSwagger(app);
    app.enableCors({
      origin: ['https://amorim.pro', 'http://localhost:5173'],
    });
  
  await app.listen(port);
}
bootstrap();
