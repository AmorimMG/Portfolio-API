import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const options = new DocumentBuilder()
  .setTitle('NestJS Swagger Example')
  .setDescription('The NestJS Swagger API description')
  .setVersion('1.0')
  .build();

export const setupSwagger = (app: INestApplication) => {
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};
