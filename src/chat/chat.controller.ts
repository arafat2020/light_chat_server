import { Controller, UseGuards, Post, Get, Patch, Delete, Body, Req, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ValidationPipe } from 'src/auth/validation.pipe';
import { GetAllMessageFromDingleChatDTO, GetOrCreateSingleMessageRooomDTO, SingleMessageDTO_delete, SingleMessageDTO_update, SingleRoomMessageCreateDTO } from './chat.dto';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
    constructor(
        private chat: ChatService
    ) { }

    @Post('get')
    @ApiBearerAuth()
    getORCreateRoom(@Body(new ValidationPipe) credential: GetOrCreateSingleMessageRooomDTO) {
        return this.chat.isExistOrCreateChat({
            userOne: credential.userOneId,
            userTwo: credential.userTwoId
        })
    }

    @Get("get/all")
    @ApiBearerAuth()
    getAll(@Req() req) {
        return this.chat.getAllSingleMessageRoom({
            user: req.user
        })
    }

    @Get('message/all')
    @ApiBearerAuth()
    getAllMEssage(@Query(new ValidationPipe) credential: GetAllMessageFromDingleChatDTO) {
        return this.chat.getAllMessaeForSingleRoom({
            id: credential.singleMessageId,
            page: credential.page
        })
    }

    @Post('message/create')
    @ApiBearerAuth()
    create(@Body(new ValidationPipe) credential: SingleRoomMessageCreateDTO, @Req() req) {
        return this.chat.message({
            content: credential.content,
            fileUrl: credential.fileUrl,
            singleChatId: credential.singleChatId,
            user: req.user,
            uuid: credential.uuid
        })
    }

    @Patch("message/update")
    @ApiBearerAuth()
    update(@Body(new ValidationPipe) credential: SingleMessageDTO_update) {
        return this.chat.update({
            content: credential.content,
            singleMessageId: credential.content
        })
    }

    @Delete("message/delete")
    @ApiBearerAuth()
    delete(@Body(new ValidationPipe) credential: SingleMessageDTO_delete) {
        return this.chat.delete({
            singleMessageId: credential.singleMessageId
        })
    }

}
