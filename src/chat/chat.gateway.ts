import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: "singleroom", cors: {
    origin: ["*"]
  }
})
export class ChatGateway {
  constructor(
    private jwt: JwtService,
    private config: ConfigService
  ) { }

  @WebSocketServer()
  private server: Server

  afterInit() {
    this.server.use(async (req, next) => {
      let token: string
      const { authorization } = await req.handshake.headers
      const auth = await req.handshake.auth.authorization

      try {
        if (authorization && typeof authorization !== 'string' && auth && typeof auth !== 'string') throw new Error("crederntial missing")
        if (authorization && typeof authorization === 'string') {
          const [Bearer, hederToeekn] = await authorization.split(" ");
          token = hederToeekn
        } else {
          console.log(typeof auth);

          if (auth && typeof auth !== 'string') throw new Error("crederntial missing from auth")
          const [Bearerauth, tokenAuth] = await auth.split(" ")
          token = tokenAuth
        }
        const payload = await this.jwt.verifyAsync(token, {
          secret: this.config.get('JWT_SECRET')
        })
        req.handshake.headers["user"] = payload
        next()
      } catch (error) {
        console.log(error);

        next(error)
      }

    })
  }

  broadCastMessage<T>({channelId,payload,type}:{channelId:string, payload:T, type:'create'|'update'|'delete'}){
    this.server.emit(channelId,{
      payload,
      type
    })
  }

}
