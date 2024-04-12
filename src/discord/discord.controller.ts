import { Controller, Get } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('discord')
@Controller('discord')
export class DiscordController {
  constructor(private discordService: DiscordService) {}

  @ApiOperation({ summary: 'Get Discord User Info' })
  @ApiResponse({ status: 200, description: 'Returns Discord user info.' })
  @Get()
  async getUserInfo(): Promise<any> {
    try {
      return await this.discordService.getUserInfo();
    } catch (error) {
      console.error('Error fetching Discord user info:', error);
      throw error;
    }
  }
}
