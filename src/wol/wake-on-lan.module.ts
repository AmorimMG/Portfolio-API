import { Module } from '@nestjs/common';
import { WakeOnLanController } from './wake-on-lan.controller';
import { WakeOnLanService } from './wake-on-lan.service';

@Module({
  controllers: [WakeOnLanController],
  providers: [WakeOnLanService],
})
export class WakeOnLanModule {}
