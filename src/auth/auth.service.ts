import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { LibService } from 'src/lib/lib.service';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
    constructor(
        private prisma: DbService,
        private lib: LibService,
        private jwt: JwtService
    ) { }

    async signUp(name: string, password: string, email: string, imgUrl: string, userId: string,) {
        const img = await this.lib.cldUpload(imgUrl)
        const hasedPassword = await this.lib.getHashed(password)
        try {
            await this.prisma.$connect()
            const newUser = await this.prisma.profile.create({
                data: {
                    id: `${this.prisma.getObjId()}`,
                    passward: hasedPassword,
                    email: email,
                    imageUrl: img.url,
                    name: name,
                    userId: userId
                }
            })
            return {
                newUser,
                access_token: await this.jwt.signAsync(newUser)
            }
        } catch (error) {
            console.log(error);
            throw new HttpException('Something Went Wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async signIn(email: string, password: string) {
        const user = await this.prisma.profile.findUnique({
            where:{
                email:email
            }
        })
        if (!user)  throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        const isVarified = await this.lib.VerifyPassword(user.passward,password)        
        if (!isVarified)  throw new HttpException('Incorrect Password', HttpStatus.BAD_REQUEST);
        return{
            user,
            access_token:  await this.jwt.signAsync(user)
        }
    }

    
}
