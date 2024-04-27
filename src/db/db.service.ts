import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'bson';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';


@Injectable()
export class DbService extends PrismaClient{
    constructor(){
        super()
    }
    getObjId(){
        return new ObjectId 
    }
    async init() {
        try {
            await this.$connect()
        } catch (error) {
            throw new Error("Db not connected")
        }
    }
}
