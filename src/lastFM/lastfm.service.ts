import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class LastFMService {
  constructor(private configService: ConfigService) {}

  async getWeeklyTrackChart(username: string): Promise<any> {
    try {
      const apiKey = this.configService.get<string>('LASTFM_APIKEY');
      const response = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=user.getWeeklyTrackChart&user=${username}&api_key=${apiKey}&format=json`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching LastFM weekly track chart:', error);
      throw error;
    }
  }
}
