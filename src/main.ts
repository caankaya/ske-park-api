import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer les CORS
  app.enableCors({
    origin: '*', // Remplace par l'URL de ton frontend ou utilise '*' pour tous les domaines
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
