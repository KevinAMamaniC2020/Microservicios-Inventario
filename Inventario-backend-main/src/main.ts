import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS (si se necesita)
  app.enableCors({
    origin: '*', // Permitir acceso desde cualquier origen (ajusta según sea necesario)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
  });

  // Configurar prefijo global para rutas (opcional)
  app.setGlobalPrefix('api');

  // Escuchar en el puerto especificado en las variables de entorno o en el puerto por defecto 8005
  const port = process.env.PORT || 8005;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();