import { Injectable } from '@nestjs/common';
import Argon2 from 'argon2';
import { HttpStatus } from '@nestjs/common/enums'
import { HttpException } from '@nestjs/common/exceptions'

@Injectable()
export class LibService {
    constructor() {
    }

    // argon start
    //******* get hased passweord *******
    async getHashed(plainStr: string): Promise<string> {
        try {
            return await Argon2.hash(plainStr)
        } catch (error) {
            console.log(error);
            throw new HttpException('Something Went Wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //******* Veryfy passweord *******
    async VerifyPassword(HasedPassword, PlainPassword: string) {
        try {
            return await Argon2.verify(HasedPassword, PlainPassword)
        } catch (error) {
            console.log(error);
            throw new HttpException('Something Went Wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    // argon End
}
