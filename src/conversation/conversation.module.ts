import { Module,NestModule,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { ConversationMiddleware } from './conversation.middleware';

@Module({
  providers: [ConversationService],
  controllers: [ConversationController]
})
export class ConversationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ConversationMiddleware)
      .forRoutes({
        path:'update',
        method:RequestMethod.PATCH
      },{
        path:'delete',
        method:RequestMethod.DELETE
      });
  }
}
