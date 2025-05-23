import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { DiscordService } from './discord.service';

@ApiTags('discord')
@Controller('discord')
export class DiscordController {
  constructor(private discordService: DiscordService) {}

  @ApiOperation({ summary: 'Get Discord User Info' })
  @ApiResponse({ status: 200, description: 'Returns Discord user info.' })
  @Public()
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
