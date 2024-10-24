import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WakeOnLanService } from './wake-on-lan.service';

@Controller('wol')
export class WakeOnLanController {
  constructor(private readonly wolService: WakeOnLanService) {}

  @ApiTags('Server')
  @Post('wake')
  wakeComputer() {
    try {
      const result = this.wolService.wakeOnLan();
      return { message: result };
    } catch (error) {
      return { message: 'Failed to send magic packet', error: error.message };
    }
  }
}
