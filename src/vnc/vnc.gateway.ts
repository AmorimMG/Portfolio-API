import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { VncService } from './vnc.service';

@WebSocketGateway({ path: '/vnc' })
export class VncGateway implements OnGatewayConnection {
  @WebSocketServer() server: WebSocket.Server;

  constructor(private readonly vncService: VncService) {}

  handleConnection(client: WebSocket) {
    this.vncService.handleConnection(client);
  }
}
