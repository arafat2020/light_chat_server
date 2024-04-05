import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { NotifyGateway } from './notify/notify.gateway';
import { ChatGetWayGateway } from './chat-get-way/chat-get-way.gateway';
import { AuthModule } from './auth/auth.module';
import { LibModule } from './lib/lib.module';
import { ConfigModule } from '@nestjs/config';
import { ServerModule } from './server/server.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: './src/client',
    }),
    AuthModule,
    LibModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    ServerModule
  ],
  controllers: [AppController],
  providers: [AppService, NotifyGateway, ChatGetWayGateway],
})
export class AppModule {}