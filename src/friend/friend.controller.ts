import { Controller, UseGuards, Post, Get, Request, Body } from '@nestjs/common';
import { FriendService } from './friend.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ValidationPipe } from 'src/auth/validation.pipe';
import { FriedDTOaccept, FriedDTOsend } from './friend.dto';

@Controller('friend')
@UseGuards(AuthGuard)
export class FriendController {
    constructor(private friendService: FriendService) { }

    @Post('send/request')
    @ApiBearerAuth()
    send(@Body(new ValidationPipe) credential: FriedDTOsend, @Request() req) {
        return this.friendService.sendFriendRequiest({
            fromID: req.user,
            toID: credential.toID
        })
    }

    @Post("accept")
    @ApiBearerAuth()
    accept(@Body(new ValidationPipe) credential: FriedDTOaccept, @Request() req) {
        return this.friendService.acceptFriendRequiest({
            friendID: credential.friendID,
            toID: req.user
        })
    }

    @Post("block")
    @ApiBearerAuth()
    block(@Body(new ValidationPipe) credential: FriedDTOaccept, @Request() req) {
        return this.friendService.blockUser({
            friendID: credential.friendID,
            toID: req.user
        })
    }

    @Get("list")
    @ApiBearerAuth()
    list(@Request() req) {
        return this.friendService.getMyFriendList({
            user: req.user
        })
    }
}
