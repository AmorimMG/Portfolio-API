import { Module } from '@nestjs/common';
import { VncGateway } from './vnc.gateway';
import { VncService } from './vnc.service';

@Module({
  providers: [VncGateway, VncService],
})
export class VncModule {}
