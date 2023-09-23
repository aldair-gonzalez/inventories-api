import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // Config Swagger API
  const config = new DocumentBuilder()
    .setTitle('INVENTORIES API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const serverPort = configService.get<string>('SERVER_PORT');
  await app.listen(serverPort);
  Logger.log(`Server running on port ${serverPort}`);
}
bootstrap();
