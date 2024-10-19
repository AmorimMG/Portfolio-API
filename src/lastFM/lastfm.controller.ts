import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LastFMService } from './lastfm.service';

@ApiTags('lastfm')
@Controller('lastfm')
export class LastFMController {
  constructor(private lastFMService: LastFMService) {}

  @ApiOperation({ summary: 'Get LastFM Weekly Track Chart' })
  @ApiResponse({
    status: 200,
    description: 'Returns LastFM weekly track chart.',
  })
  @ApiQuery({
    name: 'username',
    description: 'LastFM Username',
    required: true,
  })
  @Get()
  async getWeeklyTrackChart(@Query('username') username: string): Promise<any> {
    try {
      return await this.lastFMService.getWeeklyTrackChart(username);
    } catch (error) {
      console.error('Error fetching LastFM weekly track chart:', error);
      throw error;
    }
  }
}
