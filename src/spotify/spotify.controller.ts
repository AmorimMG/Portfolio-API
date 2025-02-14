import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
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
  @Public()
  @Get('/refresh_token')
  async refreshToken(): Promise<any> {
    return this.spotifyService.refreshAccessToken();
  }

  @Public()
  @Post('play')
  @HttpCode(HttpStatus.OK)
  async play(): Promise<void> {
    await this.spotifyService.play('spotify:album:5ht7ItJgpBH7W6vJ5BqpPr');
  }

  @Public()
  @Post('pause')
  @HttpCode(HttpStatus.OK)
  async pause(): Promise<{ success: boolean; message?: string }> {
    // First check if we can get current track
    const currentTrack = await this.spotifyService.getCurrentTrack();
    if (!currentTrack) {
      return { success: false, message: 'No active device or session found' };
    }

    const result = await this.spotifyService.pause();
    return { success: result };
  }

  @Public()
  @Post('next')
  @HttpCode(HttpStatus.OK)
  async skipToNext(): Promise<void> {
    await this.spotifyService.skipToNext();
  }

  @Public()
  @Post('previous')
  @HttpCode(HttpStatus.OK)
  async skipToPrevious(): Promise<void> {
    await this.spotifyService.skipToPrevious();
  }

  @Public()
  @Get('auth-url')
  async getAuthUrl(): Promise<{ url: string }> {
    const url = this.spotifyService.getAuthorizationUrl();
    return { url };
  }

  @Public()
  @Get('callback')
  async handleCallback(@Query('code') code: string): Promise<any> {
    if (!code) {
      throw new BadRequestException('Authorization code is required');
    }
    
    try {
      const tokens = await this.spotifyService.exchangeCodeForToken(code);
      console.log('Refresh token:', tokens.refreshToken); // Save this token
      return { 
        message: 'Authorization successful',
        refreshToken: tokens.refreshToken 
      };
    } catch (error) {
      console.error('Error in callback:', error);
      throw new BadRequestException('Failed to exchange authorization code');
    }
  }
}
