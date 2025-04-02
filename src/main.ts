import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,//rechaza propiedades no definidas en el DTO
      forbidNonWhitelisted: true,//lanza error si hay propiedades no definidas en el DTO
    }),
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Login con NestJS')
    .setDescription('Login API description')
    .setVersion('1.0')
    .addTag('Login')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'Authorization',
        description: 'Agrega tu token de autenticación JWT',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
