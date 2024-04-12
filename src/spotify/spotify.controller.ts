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
  @Get('data')
  async getSpotifyData(): Promise<any> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();
      const currentTrack =
        await this.spotifyService.getCurrentTrack(accessToken);
      const lastTrack = await this.spotifyService.getLastTrack(accessToken);

      const aggregatedData = {
        accessToken,
        currentTrack,
        lastTrack,
      };

      return aggregatedData;
    } catch (error) {
      console.error('Error fetching Spotify data:', error);
      throw error;
    }
  }
}
