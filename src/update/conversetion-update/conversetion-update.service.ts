import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { uuid } from 'uuidv4';

@Injectable()
export class ConversetionUpdateService {
    constructor(private prisma:DbService){
        this.prisma.init()
    }

    async update(){
        const msg = await this.prisma.directMessage.findMany()
        console.log(msg);
        
        await msg.map(async e=>{
            const up = await this.prisma.directMessage.update({
                where:{
                    id:e.id,
                    uuid:null
                },
                data:{
                    uuid:uuid()
                }
            })
            console.log(up);
            
        })
    }
}
