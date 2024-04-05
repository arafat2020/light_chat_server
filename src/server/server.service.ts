import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Profile, Server } from "prisma/prisma-client";
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { LibService } from 'src/lib/lib.service';

@Injectable()
export class ServerService {
    constructor(
        private prisma: DbService,
        private lib:LibService
        ) { }

    generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    async createServer({ serverName, serverImg, user }: { serverName: string, serverImg: string, user: Profile }): Promise<Server> {
        const img = await this.lib.cldUpload(serverImg)
        try {
            const server = await this.prisma.server.create({
                data: {
                    id: `${this.prisma.getObjId()}`,
                    name: serverName,
                    imageUrl: img.url,
                    profileId: user.id,
                    inviteCode: await this.generateRandomString(10)
                }
            })
            return server
        } catch (error) {
            throw new HttpException({
                msg:'Something went wrong',
                obj:error
            }, HttpStatus.INTERNAL_SERVER_ERROR,)
        }
    }
}
