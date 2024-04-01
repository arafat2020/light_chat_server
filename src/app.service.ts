import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express'

@Injectable()
export class AppService {
  getHello( res: Response) {
    return res.sendFile('index.html',{root:'./src/client'});
  }
}