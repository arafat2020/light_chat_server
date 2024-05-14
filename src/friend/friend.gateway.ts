import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Profile } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { DbService } from 'src/db/db.service';

@WebSocketGateway({
  namespace: "connect", cors: {
    origin: ["*"]
  }
},)
export class FriendGateway {

  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private prisma: DbService
  ) {
    this.prisma.init()
  }

  @WebSocketServer()
  server: Server

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

  async handleConnection(client: Socket) {
    Logger.log("connected client", client.id,)
    const user = client.handshake.headers["user"] as unknown as Profile
    const friendList: Profile[] = []
   try {
    const active = await this.prisma.profile.update({
      where: {
        id: user.id
      },
      data: {
        isaActive: true

      }, select: {
        id: true,
        from: {
          where: {
            acceepted: true
          },
          select: {
            to: true,
          }
        },
        to: {
          where: {
            acceepted: true
          },
          select: {
            from: true,
          }
        },
      }
    })
    await active.from.map(e => friendList.push(e.to))
    await active.to.map(e => friendList.push(e.from))
    Logger.log(active.id, friendList.length)
    client.emit("me", {
      connected: true
    })
    friendList.map(e => {
      e.isaActive && this.server.emit(e.id, {
        userid: e.id,
        active: true
      })
    })
   } catch (error) {
    Logger.log(error)
   }
  }

  async handleDisconnect(client: Socket) {
    Logger.log("disconnected client", client.id)
    const friendList: Profile[] = []

    const user = client.handshake.headers["user"] as unknown as Profile
    try {
      const inactive = await this.prisma.profile.update({
        where: {
          id: user.id
        },
        data: {
          isaActive: false,
          lastSeen: new Date().toISOString()
        }, select: {
          id: true,
          from: {
            where: {
              acceepted: true
            },
            select: {
              to: true,
            }
          },
          to: {
            where: {
              acceepted: true
            },
            select: {
              from: true,
            }
          },
        }
      })
      Logger.log(inactive.id, "dsiconnected")
      await inactive.from.map(e => friendList.push(e.to))
      await inactive.to.map(e => friendList.push(e.from))
      friendList.map(e => {
        e.isaActive && this.server.emit(e.id, {
          userid: e.id,
          active: false
        })
      })
    } catch (error) {
      Logger.log(error)
    }
  }
}
