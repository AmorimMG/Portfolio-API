import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SystemInfoService } from './system-info.service';
@ApiTags('Server')
@Controller('system')
export class SystemInfoController {
  constructor(private readonly systemInfoService: SystemInfoService) {}

  @Get('info')
  async getSystemInfo() {
    try {
      const systemInfo = await this.systemInfoService.getSystemInfo();
      return systemInfo;
    } catch (error) {
      return {
        message: 'Error gathering system information',
        error: error.message,
      };
    }
  }
}
