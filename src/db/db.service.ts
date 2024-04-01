import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'bson';


@Injectable()
export class DbService extends PrismaClient{
    constructor(){
        super()
    }
    getObjId(){
        return new ObjectId
    }
}
