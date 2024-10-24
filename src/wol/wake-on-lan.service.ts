import { Injectable } from '@nestjs/common';
import * as dgram from 'dgram';

@Injectable()
export class WakeOnLanService {
  private readonly macAddress = process.env['MACADDRESS_KEY'];

  wakeOnLan(): string {
    // Remove colons from the MAC address and convert to bytes
    const macBytes = Buffer.from(this.macAddress.replace(/:/g, ''), 'hex');

    // Create the magic packet (6 bytes of 0xFF followed by 16 repetitions of the MAC address)
    const magicPacket = Buffer.concat([
      Buffer.alloc(6, 0xff),
      Buffer.alloc(16, macBytes),
    ]);

    // Create a UDP socket
    const socket = dgram.createSocket('udp4');

    // Send the magic packet via broadcast to port 9 (standard WOL port)
    socket.send(magicPacket, 9, '255.255.255.255', (err) => {
      if (err) {
        console.error('Error sending WOL packet:', err);
        socket.close();
        throw new Error('Failed to send magic packet');
      }
      console.log('Magic packet sent to', this.macAddress);
      socket.close();
    });

    return `Magic packet sent to ${this.macAddress}`;
  }
}
