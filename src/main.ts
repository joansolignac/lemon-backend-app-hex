import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DomainExceptionFilter } from './shared/infrastructure/http/filters/domain-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new DomainExceptionFilter());

  let swaggerUrl: string | undefined;

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Lemon App API')
      .setDescription('Documentacion de la API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    swaggerUrl = 'http://localhost:${port}/api/docs';
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  logger.log(`Application running on port ${port}`);
  logger.log(`API base URL: http://localhost:${port}/api/v1`);

  if (swaggerUrl) {
    logger.log(`Swagger documentation available at: http://localhost:${port}/api/docs`);
  }
}
void bootstrap();
