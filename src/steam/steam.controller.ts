import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SteamService } from './steam.service';

@ApiTags('steam')
@Controller('steam')
export class SteamController {
  constructor(private steamService: SteamService) {}

  @ApiOperation({ summary: 'Get Steam Player Summaries' })
  @ApiResponse({ status: 200, description: 'Returns Steam player summaries.' })
  @Get()
  async getPlayerSummaries(): Promise<any> {
    try {
      return await this.steamService.getPlayerSummaries();
    } catch (error) {
      console.error('Error fetching Steam player summaries:', error);
      throw error;
    }
  }
}
