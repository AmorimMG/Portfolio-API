import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DiscordService {
  async getUserInfo(): Promise<any> {
    try {
      const response = await axios.get(
        'https://api.lanyard.rest/v1/users/257165295427256320',
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Discord user info:', error);
      throw error;
    }
  }
}
