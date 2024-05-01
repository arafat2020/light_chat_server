import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as socketio from 'socket.io';
import { IoAdapter } from '@nestjs/platform-socket.io';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  const config = new DocumentBuilder()
    .setTitle('Light Chat Server')
    .setDescription('A Backend Massaging Server')
    .setVersion('1.0')
    .addTag('Light Chat')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  app.enableCors({
    origin:'*'
  })
  // const io = new socketio.Server(app.getHttpServer());
  // app.useWebSocketAdapter(new IoAdapter(io));
  await app.listen(5000);
}
bootstrap();