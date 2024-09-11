import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer les CORS
  app.enableCors({
    origin: '*', // Remplace par l'URL de ton frontend ou utilise '*' pour tous les domaines
  });

  await app.listen(3000);
}
bootstrap();
