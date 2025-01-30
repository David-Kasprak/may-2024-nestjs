import { Injectable } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';

@Injectable()
@WebSocketGateway({
  pingTimeout: 60000,
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly authService: AuthService) {}

  @SubscribeMessage('sign-in')
  async joinInRoom(client: Socket, data: { token: string }): Promise<any> {
    const user = await this.authService.validate(data.token);
    if (!user.id) {
      client.emit('user-unauthorized', {
        statusCode: 401,
        error: 'Unauthorized',
      })
      return 'Unauthorized';
    }
  }
}
