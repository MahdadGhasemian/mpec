import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const documentOptions = new DocumentBuilder()
    .setTitle('MPEC App')
    .setDescription('Mathematical Proof Explanatory Chain')
    .setVersion('1.0')
    .addServer(
      `${configService.getOrThrow<string>('SWAGGER_SERVER_HOST')}`,
      'Server',
    )
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors();
  await app.listen(configService.get<number>('HTTP_PORT', 3000));
}

bootstrap();
