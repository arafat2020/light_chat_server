import { Module, } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { NotifyGateway } from './notify/notify.gateway';
import { AuthModule } from './auth/auth.module';
import { LibModule } from './lib/lib.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServerModule } from './server/server.module';
import { EmailModule } from './email/email.module';
import { ChannelModule } from './channel/channel.module';
import { MemberModule } from './member/member.module';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { join, resolve } from 'path';
import { UpdateModule } from './update/update.module';
import { RenderModule } from 'nest-next';
import Next from 'next';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    AuthModule,
    LibModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ServerModule,
    EmailModule,
    ChannelModule,
    MemberModule,
    MessageModule,
    ConversationModule,
    UpdateModule,
    RenderModule.forRootAsync(Next({ dev: true})),
  ],
  controllers: [AppController],
  providers: [AppService, NotifyGateway],
})
export class AppModule { }