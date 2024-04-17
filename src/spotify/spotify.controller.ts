import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { SpotifyService } from './spotify.service';

@ApiTags('spotify')
@Controller('spotify')
export class SpotifyController {
  constructor(private spotifyService: SpotifyService) {
    console.log('teste');
  }

  @ApiOperation({ summary: 'Receives Spotify Data' })
  @ApiResponse({ status: 200, description: 'Returns Data from Spotify.' })
  @Get()
  async getSpotifyData(): Promise<any> {
    try {
      const currentTrack = await this.spotifyService.getCurrentTrack();
      const lastTrack = await this.spotifyService.getLastTrack();

      const aggregatedData = {
        currentTrack,
        lastTrack,
      };

      return aggregatedData;
    } catch (error) {
      console.error('Error fetching Spotify data:', error);
      throw error;
    }
  }
  @ApiOperation({ summary: 'Receives Spotify Refresh Token' })
  @ApiResponse({
    status: 200,
    description: 'Returns Refresh Token from Spotify.',
  })
  @Get('/refresh_token')
  async refreshToken(): Promise<any> {
    return this.spotifyService.refreshAccessToken();
  }
}
