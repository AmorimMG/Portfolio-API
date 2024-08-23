import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GithubService {
  private readonly GITHUB_API_URL = 'https://api.github.com/graphql';
  private readonly accessToken = process.env.GITHUB_TOKEN;

  async getContributions(username: string): Promise<any> {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const response = await axios.post(
      this.GITHUB_API_URL,
      { query, variables: { username } },
      { headers: { Authorization: `Bearer ${this.accessToken}` } },
    );

    return response.data.data.user.contributionsCollection.contributionCalendar
      .weeks;
  }
}
