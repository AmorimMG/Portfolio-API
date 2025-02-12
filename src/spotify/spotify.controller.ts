import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { SpotifyService } from './spotify.service';

@ApiTags('spotify')
@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @ApiOperation({ summary: 'Receives Spotify Data' })
  @ApiResponse({ status: 200, description: 'Returns Data from Spotify.' })
  @Public()
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

  @Post('play')
  @HttpCode(HttpStatus.OK)
  async play(): Promise<void> {
    await this.spotifyService.play('spotify:album:5ht7ItJgpBH7W6vJ5BqpPr');
  }

  @Post('pause')
  @HttpCode(HttpStatus.OK)
  async pause(): Promise<void> {
    await this.spotifyService.pause();
  }

  @Post('next')
  @HttpCode(HttpStatus.OK)
  async skipToNext(): Promise<void> {
    await this.spotifyService.skipToNext();
  }

  @Post('previous')
  @HttpCode(HttpStatus.OK)
  async skipToPrevious(): Promise<void> {
    await this.spotifyService.skipToPrevious();
  }
}
