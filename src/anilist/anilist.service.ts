import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AnilistService {
  async fetchData(name: string) {
    try {
      const response = await axios.post('https://graphql.anilist.co', {
        query: `
          query($name:String){
            User(name:$name){
              stats{
                activityHistory {
                  date
                  amount
                  level
                }
              }
            }
          }
        `,
        variables: {
          name,
        },
      });

      const activityHistory = response.data.data.User.stats.activityHistory;
      return this.processData(activityHistory);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  private processData(activityHistory: any[]) {
    return activityHistory;
  }
}
