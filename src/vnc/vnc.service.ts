import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';

@Injectable()
export class VncService {
  private vncServerUrl = 'ws://YOUR_VNC_SERVER_IP:5900'; // VNC server address

  // Handle incoming WebSocket connections from the frontend
  handleConnection(clientSocket: WebSocket) {
    const vncSocket = new WebSocket(this.vncServerUrl);

    // When a message is received from the frontend, forward it to the VNC server
    clientSocket.on('message', (data) => {
      if (vncSocket.readyState === WebSocket.OPEN) {
        vncSocket.send(data);
      }
    });

    // When a message is received from the VNC server, forward it to the frontend
    vncSocket.on('message', (data) => {
      if (clientSocket.readyState === WebSocket.OPEN) {
        clientSocket.send(data);
      }
    });

    // Handle errors and disconnections
    clientSocket.on('close', () => vncSocket.close());
    vncSocket.on('close', () => clientSocket.close());
  }
}
