import { SubscribeMessage, WebSocketGateway,WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'notify' })
export class NotifyGateway {

  @WebSocketServer()
  server:Server

  
  @SubscribeMessage('message')
  handleEvent(client: Socket, data: any) {
    console.log(`Event received from client ${client.id}:`, data);

    this.server.emit('message', data);
  }

}
