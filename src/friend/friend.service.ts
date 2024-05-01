import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FriendService {
    constructor(private prisma: DbService) {
        this.prisma.init()
    }

    async sendFriendRequiest({ fromID, toID }: {
        fromID: Profile,
        toID: string
    }) {
        if (fromID.id === toID) throw new HttpException("fromID and toID cannot be same", HttpStatus.BAD_REQUEST)
        return await this.prisma.friend.create({
            data: {
                id: this.prisma.getObjId() as unknown as string,
                fromId: fromID.id,
                toId: toID,
            }
        })
    }

    async acceptFriendRequiest({ toID, friendID }: {
        toID: Profile,
        friendID: string
    }) {
        return await this.prisma.friend.update({
            where: {
                id: friendID,
                toId: toID.id
            },
            data: {
                acceepted: true
            }
        })
    }
    async blockUser({ friendID, toID }: {
        friendID: string,
        toID: Profile
    }) {
        return await this.prisma.friend.update({
            where: {
                id: friendID,
                toId: toID.id
            },
            data: {
                blocked: true
            }
        })
    }

    async getMyFriendList({ user }: { user: Profile }) {
        const friendList:Profile[] = []
        const friends = await this.prisma.profile.findUnique({
            where: {
                id: user.id,
            },
            select: {
                from: {
                    where: {
                        acceepted: true
                    },
                    select: {
                        to: true,
                    }
                },
                to: {
                    where: {
                        acceepted: true
                    },
                    select: {
                        from: true,
                    }
                },
            }
        })
        await friends.from.map(e => friendList.push(e.to))
        await friends.to.map(e => friendList.push(e.from))
        return friendList
    }
}
