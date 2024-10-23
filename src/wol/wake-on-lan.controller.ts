import { Body, Controller, Post } from '@nestjs/common';
import { WakeOnLanService } from './wake-on-lan.service';

@Controller('wol')
export class WakeOnLanController {
  constructor(private readonly wolService: WakeOnLanService) {}

  @Post('wake')
  wakeComputer(@Body('macAddress') macAddress: string) {
    if (!macAddress) {
      return { message: 'MAC Address is required!' };
    }
    
    try {
      const result = this.wolService.wakeOnLan(macAddress);
      return { message: result };
    } catch (error) {
      return { message: 'Failed to send magic packet', error: error.message };
    }
  }
}
