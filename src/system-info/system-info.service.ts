import { Injectable } from '@nestjs/common';
import * as disk from 'diskusage';
import * as os from 'os';

@Injectable()
export class SystemInfoService {

  // Function to gather system information
  async getSystemInfo() {
    const platform = os.platform();
    const uptime = os.uptime();
    const hostname = os.hostname();
    const osType = os.type();
    const osVersion = os.release();
    const cpu = os.cpus();
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const networkInterfaces = os.networkInterfaces();
    
    // Get disk space usage (you can replace "/" with the relevant path for Windows or other mounts)
    const diskInfo = await disk.check('/'); // "/" is root for Linux/macOS

    return {
      platform,
      hostname,
      osType,
      osVersion,
      uptime,
      cpu,
      totalMemory,
      freeMemory,
      networkInterfaces,
      disk: {
        total: diskInfo.total,
        free: diskInfo.free,
        available: diskInfo.available,
      },
    };
  }
}
