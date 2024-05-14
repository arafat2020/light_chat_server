import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { v4 as uuidv4 } from "uuid";


@Injectable()
export class ChatService {
    constructor(
        private prisma: DbService
    ) {
        this.prisma.init()
    }

    async getAllMessaeForSingleRoom({ id, page = 0 }: { id: string, page: number }) {
        try {
            return this.prisma.singleRoomMessage.findMany({
                where: {
                    singleChatId: id
                },
                include: {
                    member: {
                        select: {
                            id: true,
                            name: true,
                            imageUrl: true
                        }
                    }
                },
                skip: page * 10,
                take: 10
            })
        } catch (error) {
            throw new HttpException({
                msg: 'something went wrong',
                obj: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    private async isExist({
        userOne,
        userTwo
    }: {
        userOne: string,
        userTwo: string,
    }) {
        try {
            return await this.prisma.singleChat.findFirst({
                where: {
                    AND: [
                        { userOneId: userOne },
                        { userTwoId: userTwo }
                    ]
                },
                include: {
                    userOne: true,
                    userTwo: true
                }
            })
        } catch (error) {
            throw new HttpException({
                msg: 'something went wrong',
                obj: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    private async createChat({
        userOne,
        userTwo
    }: {
        userOne: string,
        userTwo: string,
    }) {
        try {
            return await this.prisma.singleChat.create({
                data: {
                    id: await this.prisma.getObjId() as unknown as string,
                    userOneId: userOne,
                    userTwoId: userTwo
                },
                include: {
                    userOne: true,
                    userTwo: true
                }
            })
        } catch (error) {
            throw new HttpException({
                msg: 'something went wrong',
                obj: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async isExistOrCreateChat({
        userOne,
        userTwo
    }: {
        userOne: string,
        userTwo: string,
    }) {
        const singlCat = await this.isExist({ userOne: userOne, userTwo: userTwo }) || await this.isExist({ userOne: userTwo, userTwo: userOne })
        if (!singlCat) return await this.createChat({ userOne: userOne, userTwo: userTwo })
        return singlCat
    }

    async message({ singleChatId, user, content, fileUrl, uuid }: {
        singleChatId: string,
        user: Profile,
        content: string,
        fileUrl: string | undefined,
        uuid: string
    }) {
        const singleChat = await this.prisma.singleChat.findFirst({
            where: {
                id: singleChatId,
                OR: [
                    { userOne: { id: user.id } },
                    { userTwo: { id: user.id } }
                ]
            },
            include: {
                userOne: true,
                userTwo: true
            }
        })
        if (!singleChat) throw new HttpException('conversation not found', HttpStatus.NOT_FOUND)
        const member = singleChat.userOne.id === user.id ? singleChat.userOne : singleChat.userTwo

        if (!member) throw new HttpException('user not found', HttpStatus.NOT_FOUND)
        try {
            const message = await this.prisma.singleRoomMessage.create({
                data: {
                    id: this.prisma.getObjId() as unknown as string,
                    content,
                    uuid: uuid ? uuid : uuidv4(),
                    fileUrl,
                    singleChatId,
                    userId: user.id
                }
            })

            return message
        } catch (error) {
            throw new HttpException({
                msg: 'something went wrong',
                obj: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async update({ singleMessageId, content }: { singleMessageId: string, content: string }) {
        try {
            return this.prisma.singleRoomMessage.update({
                where: {
                    id: singleMessageId
                },
                data: {
                    content
                }
            })
        } catch (error) {
            throw new HttpException({
                msg: 'something went wrong',
                obj: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async delete({ singleMessageId }: { singleMessageId: string }) {
        try {
            return this.prisma.singleRoomMessage.update({
                where: {
                    id: singleMessageId
                },
                data: {
                    fileUrl: null,
                    content: "This message has been deleted.",
                    deleted: true,
                },
                include: {
                    member: true
                }
            })
        } catch (error) {
            throw new HttpException({
                msg: 'something went wrong',
                obj: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async getAllSingleMessageRoom({ user }: { user: Profile }) {
        try {
            return this.prisma.singleChat.findMany({
                where: {
                    OR: [
                        { userOneId: user.id },
                        { userTwoId: user.id }
                    ]
                }, include: {
                    userOne: true,
                    userTwo: true
                }
            })
        } catch (error) {
            throw new HttpException({
                msg: 'something went wrong',
                obj: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

}
