import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express'

@Injectable()
export class AppService {
  getHello(
    res: Response,
    ) {
    res.send('hello from nest')
  }
}