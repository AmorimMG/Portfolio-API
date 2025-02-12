import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export const options = new DocumentBuilder()
  .setTitle('NestJS Portfolio Swagger')
  .setVersion('0.0.1')
  .setDescription('The NestJS Swagger API description')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header',
    name: 'Authorization',
    description: 'Enter your Bearer token',
  })
  .addSecurityRequirements('bearer')
  .build();

export const setupSwagger = (app: INestApplication) => {
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  app.use(
    '/reference',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );
};
