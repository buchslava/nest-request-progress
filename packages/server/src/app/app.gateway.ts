import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ProgressManager } from './progress-manager';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit {
  constructor(private progressManager: ProgressManager) {}

  @WebSocketServer() server: Server;

  afterInit() {
    this.progressManager.server = this.server;
  }
}
