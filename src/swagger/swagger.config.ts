import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const options = new DocumentBuilder()
  .setTitle('NestJS Portfolio Swagger')
  .setDescription('The NestJS Swagger API description')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'bearerAuth',
  )
  .build();

export const setupSwagger = (app: INestApplication) => {
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);
};
