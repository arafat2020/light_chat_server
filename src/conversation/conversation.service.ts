import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class ConversationService {
    constructor(private prisma: DbService) {
        this.prisma.init()
    }

    // -----------------------------------One to one chat create start----------------------------------------
    async getOrCreateConversation({ memberOneId, memberTwoId }: { memberOneId: string, memberTwoId: string }) {
        const findConversation = async (memberOneId: string, memberTwoId: string) => {
            try {
                return await this.prisma.conversation.findFirst({
                    where: {
                        AND: [
                            { memberOneId: memberOneId },
                            { memberTwoId: memberTwoId },
                        ]
                    },
                    include: {
                        memberOne: {
                            include: {
                                profile: true,
                            }
                        },
                        memberTwo: {
                            include: {
                                profile: true,
                            }
                        }
                    }
                });
            } catch {
                return null;
            }
        }

        const createNewConversation = async (memberOneId: string, memberTwoId: string) => {

            try {
                return await this.prisma.conversation.create({
                    data: {
                        id: `${this.prisma.getObjId()}`,
                        memberOneId,
                        memberTwoId,
                    },
                    include: {
                        memberOne: {
                            include: {
                                profile: true,
                            }
                        },
                        memberTwo: {
                            include: {
                                profile: true,
                            }
                        }
                    }
                })
            } catch {
                return null;
            }
        }
        let conversation = await findConversation(memberOneId, memberTwoId) || await findConversation(memberTwoId, memberOneId);

        if (!conversation) {
            conversation = await createNewConversation(memberOneId, memberTwoId);
        }

        return conversation;
    }
    // -----------------------------------One to one chat end----------------------------------------
    // -----------------------------------One to one massage create start----------------------------------------
    async create({ conversationId, user, content, fileUrl }: { conversationId: string, user: Profile, content: string, fileUrl: string | undefined }) {
        const conversation = await this.prisma.conversation.findFirst({
            where: {
                id: conversationId,
                OR: [
                    {
                        memberOne: {
                            profileId: user.id,
                        }
                    },
                    {
                        memberTwo: {
                            profileId: user.id,
                        }
                    }
                ]
            },
            include: {
                memberOne: {
                    include: {
                        profile: true,
                    }
                },
                memberTwo: {
                    include: {
                        profile: true,
                    }
                }
            }
        })
        if (!conversation) throw new HttpException('conversation not found', HttpStatus.NOT_FOUND)
        const member = conversation.memberOne.profileId === user.id ? conversation.memberOne : conversation.memberTwo

        if (!member) throw new HttpException('member not found', HttpStatus.NOT_FOUND)

        try {
            const message = await this.prisma.directMessage.create({
                data: {
                    id: `${this.prisma.getObjId()}`,
                    content,
                    fileUrl,
                    conversationId: conversationId,
                    memberId: member.id,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                }
            });
            return message
        } catch (error) {
            throw new HttpException({
                msg: 'something went wrong',
                obj: error
            }, HttpStatus.BAD_REQUEST)
        }
    }
    // -----------------------------------One to one massage create end----------------------------------------
    // -----------------------------------One to one massage update start----------------------------------------
    async update({ directMessageId, content }: { directMessageId: string, content: string }) {
        try {
            const directMessage = await this.prisma.directMessage.update({
                where: {
                    id: directMessageId,
                },
                data: {
                    content,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                }
            })
            return directMessage
        } catch (error) {
            throw new HttpException({
                msg: 'something went wrong',
                obj: error
            }, HttpStatus.BAD_REQUEST)
        }
    }
    // -----------------------------------One to one massage update end----------------------------------------
    // -----------------------------------One to one massage delete start----------------------------------------
    async delete({directMessageId}:{directMessageId:string}) {
        try {
           const directMessage = await this.prisma.directMessage.update({
                where: {
                  id: directMessageId ,
                },
                data: {
                  fileUrl: null,
                  content: "This message has been deleted.",
                  deleted: true,
                },
                include: {
                  member: {
                    include: {
                      profile: true,
                    }
                  }
                }
              })
            return directMessage
        } catch (error) {
            throw new HttpException({
                msg: 'something went wrong',
                obj: error
            }, HttpStatus.BAD_REQUEST)
        }
    }
    // -----------------------------------One to one massage delete end----------------------------------------
}
