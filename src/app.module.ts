import { Module, } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { FriendModule } from './friend/friend.module';


@Module({
  imports: [
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
    FriendModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotifyGateway],
})
export class AppModule { }