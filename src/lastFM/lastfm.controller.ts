import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
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
  @Public()
  @Get()
  async getWeeklyTrackChart(@Query('username') username: string): Promise<any> {
    try {
      return await this.lastFMService.getWeeklyTrackChart(username);
    } catch (error) {
      console.error('Error fetching LastFM weekly track chart:', error);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get LastFM User Data' })
  @ApiResponse({
    status: 200,
    description: 'Returns LastFM weekly User Data.',
  })
  @ApiQuery({
    name: 'username',
    description: 'LastFM Username',
    required: true,
  })
  @Public()
  @Get('/user')
  async getUserData(@Query('username') username: string): Promise<any> {
    try {
      return await this.lastFMService.getUserData(username);
    } catch (error) {
      console.error('Error fetching LastFM User Data:', error);
      throw error;
    }
  }
}
