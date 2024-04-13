import { Module } from '@nestjs/common';
import { MsgUpdateService } from './msg-update/msg-update.service';
import { MsgUpdateController } from './msg-update/msg-update.controller';
import { ConversetionUpdateModule } from './conversetion-update/conversetion-update.module';

@Module({
  providers: [MsgUpdateService],
  controllers: [MsgUpdateController],
  imports: [ConversetionUpdateModule]
})
export class UpdateModule {}
