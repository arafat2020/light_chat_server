import { SubscribeMessage, WebSocketGateway ,WebSocketServer } from '@nestjs/websockets';
import { Server,Socket } from "socket.io";

@WebSocketGateway({namespace:'chat'})
export class ChatGetWayGateway {
  @WebSocketServer()
  server:Server

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    
  }
}
