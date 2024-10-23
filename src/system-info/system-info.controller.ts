import { Controller, Get } from '@nestjs/common';
import { SystemInfoService } from './system-info.service';

@Controller('system')
export class SystemInfoController {
  constructor(private readonly systemInfoService: SystemInfoService) {}

  @Get('info')
  async getSystemInfo() {
    try {
      const systemInfo = await this.systemInfoService.getSystemInfo();
      return systemInfo;
    } catch (error) {
      return { message: 'Error gathering system information', error: error.message };
    }
  }
}
