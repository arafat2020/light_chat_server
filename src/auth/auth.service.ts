import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { LibService } from 'src/lib/lib.service';


@Injectable()
export class AuthService {
    constructor(private prisma: DbService, private lib: LibService) { }

    async signUp(name: string, password: string, email: string, imgUrl: string, userId,) {
        const hasedPassword = await this.lib.getHashed(password)
        await this.prisma.$connect()
        await this.prisma.profile.create({
            data: {
                id: `${this.prisma.getObjId()}`,
                passward: hasedPassword,
                email: email,
                imageUrl: imgUrl,
                name: name,
                userId: userId
            }
        })
    }
}
