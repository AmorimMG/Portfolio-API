import { Module } from '@nestjs/common';
import { SystemInfoController } from './system-info.controller';
import { SystemInfoService } from './system-info.service';

@Module({
  providers: [SystemInfoService],
  controllers: [SystemInfoController],
})
export class SystemInfoModule {}
