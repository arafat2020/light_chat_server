import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOrCreateSingleMessageRooomDTO {

    @ApiProperty()
    @IsNotEmpty()
    userOneId: string

    @ApiProperty()
    @IsNotEmpty()
    userTwoId: string
}

export class SingleRoomMessageCreateDTO {

    @ApiProperty()
    @IsNotEmpty()
    singleChatId: string

    @ApiProperty()
    @IsNotEmpty()
    content: string

    @ApiProperty()
    fileUrl: string | undefined

    @ApiProperty()
    @IsNotEmpty()
    uuid: string
}

export class SingleMessageDTO_update {

    @ApiProperty()
    @IsNotEmpty()
    content: string

    @ApiProperty()
    @IsNotEmpty()
    singleMessageId: string

    @ApiProperty()
    @IsNotEmpty()
    singleRoomId: string
}

export class SingleMessageDTO_delete {

    @ApiProperty()
    @IsNotEmpty()
    singleMessageId: string
}

export class GetAllMessageFromDingleChatDTO{
    @ApiProperty()
    @IsNotEmpty()
    singleMessageId: string

    @ApiProperty()
    page: number
}