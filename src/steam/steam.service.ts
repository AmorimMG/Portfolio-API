import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SteamService {
  constructor(private configService: ConfigService) {}

  async getPlayerSummaries(): Promise<any> {
    try {
      const steamId = this.configService.get<string>('STEAM_ID');
      const steamKey = this.configService.get<string>('STEAM_KEY');

      const response = await axios.get(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${steamKey}&format=json&steamids=${steamId}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Steam player summaries:', error);
      throw error;
    }
  }
}
