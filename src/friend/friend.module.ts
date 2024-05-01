import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { FriendGateway } from './friend.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [FriendService, FriendGateway,JwtService],
  controllers: [FriendController]
})
export class FriendModule {}
